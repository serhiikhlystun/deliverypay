const { Pool } = require("pg");
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const uuid = require('uuid');
const { v4: uuidv4 } = uuid;

const app = express();
app.use(bodyParser.json());
const port = 8081;

const pool = new Pool({
  user: 'root',
  host: '139.59.26.27',  // або ваш хост
  database: 'postgres',
  password: '',
  port: 26257,  // або ваш порт
  ssl: false,  // налаштуйте SSL, якщо потрібно
});

const api = "/api/v1";

// Перевірка токена напряму через SQL
const isValidToken = async (password_hash) => {
  console.log("Received password_hash:", password_hash);

  try {
    const { rows } = await pool.query(
      "SELECT id FROM public.user WHERE password_hash = $1",
      [password_hash]
    );
    return rows.length > 0;
  } catch (error) {
    console.error("Error during token validation:", error);
    return false;
  }
};

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Відсутні авторизаційні дані' });
  }

  const password_hash = authHeader.split(' ')[1];
  console.log("Received token:", password_hash);

  const isValid = await isValidToken(password_hash);

  if (!isValid) {
    return res.status(403).json({ error: 'Недійсний токен' });
  }

  next();
};

const findOrCreateUser = async (phone, appname = "NDCHARGER") => {
  const { rows } = await pool.query(
    "SELECT * FROM public.user WHERE phone = $1",
    [phone]
  );
  let user;
  if (rows.length === 0) {
    const newUserId = uuidv4();  // Генеруємо новий UUID для id
    const { rows: newUserRows } = await pool.query(
      "INSERT INTO public.user (id, phone, appname) VALUES ($1, $2, $3) RETURNING *",
      [newUserId, phone, appname]
    );
    user = newUserRows[0];
    console.log(user, 'created');
  } else {
    user = rows[0];
    console.log(user, 'isset');
  }
  return user;
};

const findOrCreateClientAndWallet = async (userId) => {
  const { rows: clientRows } = await pool.query(
    "SELECT * FROM public.clients WHERE user_id = $1",
    [userId]
  );

  let client;
  if (clientRows.length === 0) {
    const newClientId = uuidv4();  // Генеруємо новий UUID для id
    const { rows: newClientRows } = await pool.query(
      "INSERT INTO public.clients (\"CardOwnerId\", user_id) VALUES ($1, $2) RETURNING *",
      [newClientId, userId]
    );
    client = newClientRows[0];
    console.log(client, 'created client');

    const newWalletId = uuidv4();  // Генеруємо новий UUID для id
    const { rows: walletRows } = await pool.query(
      "INSERT INTO public.wallets (id, client_id) VALUES ($1, $2) RETURNING *",
      [newWalletId, client["CardOwnerId"]]
    );
    return { client, wallet: walletRows[0] };
  }

  client = clientRows[0];
  console.log(client, 'find client');
  var { rows: walletRows } = await pool.query(
    "SELECT * FROM public.wallets WHERE client_id = $1",
    [client["CardOwnerId"]]
  );
  console.log(walletRows[0]);
  if(!walletRows[0]){
    const newWalletId = uuidv4();  // Генеруємо новий UUID для id
    var { rows: walletRows } = await pool.query(
      "INSERT INTO public.wallets (id, client_id) VALUES ($1, $2) RETURNING *",
      [newWalletId, client["CardOwnerId"]]
    );
  }

  return { client, wallet: walletRows[0] };
};

const findOrCreateCard = async (walletId, cardNumber, expirationDate) => {
  const { rows: cardRows } = await pool.query(
    "SELECT * FROM public.card WHERE card_number = $1 AND wallet_id = $2",
    [cardNumber, walletId]
  );

  console.log(cardRows,'cardRows 1')
  if (cardRows.length === 0) {
    const newCardId = uuidv4();  // Генеруємо новий UUID для id
    const { rows: newCardRows } = await pool.query(
      "INSERT INTO public.card (id, card_number, expire, wallet_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [newCardId, cardNumber, expirationDate, walletId]
    );
    console.log(newCardRows,'newCardRows 1')
    return newCardRows[0];
  }
  return cardRows[0];
};

const generateAndSaveOTP = async (userId) => {
  const otp = generateOTP();
  await pool.query(
    "UPDATE public.user SET \"OTP\" = $1 WHERE id = $2",
    [otp, userId]
  );
  return otp;
};

const findUserByOtp = async (userId, otp) => {
  const { rows } = await pool.query(
    "SELECT * FROM public.user WHERE id = $1 AND \"OTP\" = $2",
    [userId, otp]
  );
  return rows;
};

const updateUserPasswordHash = async (userId, passwordHash) => {
  await pool.query(
    "UPDATE public.user SET password_hash = $1 WHERE id = $2",
    [passwordHash, userId]
  );
};

// Роут для створення картки
app.post(`${api}/create-card`, authMiddleware, async (req, res) => {
  const { phone, cardNumber, expirationDate } = req.body;
  console.log(phone, 'phone');

  try {
    const userData = await findOrCreateUser(phone);
    const { client, wallet } = await findOrCreateClientAndWallet(userData.id);
    console.log(client, wallet,'client, wallet')
    const cardData = await findOrCreateCard(wallet.id, cardNumber, expirationDate);
    console.log(cardData,'cardData')
    const otpResponse = await generateOtp({ cardNumber, expirationDate, phone });
    if (otpResponse.result) {
      await pool.query(
        "UPDATE public.card SET external_id = $1 WHERE id = $2",
        [otpResponse.result.id, cardData.id]
      );
    }

    const otp = true;
    res.json({
      card_id: cardData.id,
      otp,
      status: otpResponse.status,
      message: !otpResponse.error ? "Success" : otpResponse.error.message
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.errors });
  }
});

// Роут для отримання списку карток
app.post(`${api}/card-list`, authMiddleware, async (req, res) => {
  const { phone } = req.body;

  try {
    const userData = await findOrCreateUser(phone);
    const { client, wallet } = await findOrCreateClientAndWallet(userData.id);

    const { rows: cardData } = await pool.query(
      "SELECT id, expire, card_number, dealstoken, is_active, verify FROM public.card WHERE wallet_id = $1 AND is_active = true",
      [wallet.id]
    );

    res.json({ cardData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.errors });
  }
});

// Роут для аутентифікації користувача
app.post(`${api}/authenticate`, async (req, res) => {
  const { phone } = req.body;
  try {
    const userData = await findOrCreateUser(phone);
    console.log(userData, '1');
   
    const { client, wallet } = await findOrCreateClientAndWallet(userData.id, phone);
    const otp = await generateAndSaveOTP(userData.id);
    console.log(otp,'w',wallet);
    if (!userData.wallet_id) {
      
      res.json({ message: "OTP sent successfully", client, user_id: userData.id, wallet_id: wallet.id });
    } else {
      res.json({ message: "OTP sent successfully", user_id: userData.id });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.errors });
  }
});

// Роут для перевірки OTP і завершення аутентифікації
app.post(`${api}/verify-authenticate`, async (req, res) => {
  const { otp, user_id } = req.body;

  try {
    const userFind = await findUserByOtp(user_id, otp);

    if (userFind.length === 0) {
      res.status(400).json({ error: "Invalid OTP or User ID" });
    } else {
      const newHash = await uuidv4();  
      const password_hash = userFind[0].password_hash || newHash;
      await updateUserPasswordHash(user_id, password_hash);
      res.json({ message: "OTP verified successfully", password_hash });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.errors });
  }
});

// Роут для підтвердження картки
app.post(`${api}/confirm-card`, authMiddleware, async (req, res) => {
  try {
    const { otp_code, card_id } = req.body;

    const { rows: external } = await pool.query(
      "SELECT external_id FROM public.card WHERE id = $1",
      [card_id]
    );
    const otpResponse = await confirmOtp({
      id: external[0].external_id,
      code: otp_code
    });
    if (!otpResponse.error && otpResponse.status !== "FAILED") {
      await pool.query(
        "UPDATE public.card SET verify = true, \"OTP\" = $1, token = $2, owner = $3, card_number_hash = $4, phone = $5, username = $6 WHERE id = $7",
        [otp_code, otpResponse.result.card, otpResponse.result.cardHolder, otpResponse.result.pan, otpResponse.result.phone, otpResponse.result.username, card_id]
      );
    }
    res.json({
      card_id,
      status: otpResponse.status,
      message: otpResponse.error.message ?? "SUCCESS"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.errors });
  }
});

// Роут для здійснення платежу
app.post(`${api}/payment`, authMiddleware, async (req, res) => {
  try {
    const { card_id, amount } = req.body;
    const { rows: cardData } = await pool.query(
      "SELECT id, expire, card_number, token, is_active, verify FROM public.card WHERE id = $1",
      [card_id]
    );

    const paymentData = {
      id: "deals_" + new Date(),
      amount,
      account: "01H197VB",
      serviceId: "469469101",
      card: cardData[0].token
    };

    const paymentResponse = await axios.post(
      "https://bank.deals.systems/payment/api/v1/pay",
      paymentData,
      {
        headers: {
          Authorization: "Basic ZGVhbHM6cX03WGQ1MlsxSjxO"
        }
      }
    );

    console.log(paymentResponse.data);
    res.json(paymentResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.errors });
  }
});

// Роут для деактивації картки
app.post(`${api}/delete-card`, authMiddleware, async (req, res) => {
  try {
    const { card_id, is_active } = req.body;
    await pool.query(
      "UPDATE public.card SET is_active = $1 WHERE id = $2",
      [is_active, card_id]
    );
    res.json({ message: `Card change active status:${is_active} successfully`, status: "SUCCESS" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.errors });
  }
});

// Роут для перевірки BIN картки
app.get(`${api}/bins/:bin`, async (req, res) => {
  try {
    const { bin } = req.params;
    const { rows: items } = await pool.query(
      "SELECT * FROM public.bin WHERE BIN = $1",
      [parseInt(bin)]
    );
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Роут для перевірки балансу рахунку
app.get(`${api}/account-status`, async (req, res) => {
  try {
    const { accountNumber, startDate } = req.query;
    const response = await axios.get(
      `https://acp.privatbank.ua/api/statements/balance/final?acc=${accountNumber}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10)",
          "token": "d2bc82dd-191e-4876-a074-914da65ce724kxYZ6L2CPSDAzIVsFSAKZz5p9pK2FiJ/nRaaH6UShj6eU8/QDOkJvczkO8Hwt044lIM/6osbDAjUTXGnQ0qLBQHGXGRIc5KJX3tJ32Ps4xG54aRNku35MahqtwtajXiGeybMSp1NU6Lm4ZqVurGv0wLBYEaIj9Fy8WnuzQQI+6lQ+H80HhhPwFyLmLAgbl3b32U9Ecf/oxYSPIztY4ZW2KYJZSrRheZlu/cIM6OCt5iSX9QIBloWZbsL+f7cx3kTmA==",
          "Content-Type": "application/json;charset=cp1251"
        }
      }
    );
    const responseTransactions = await axios.get(
      `https://acp.privatbank.ua/api/statements/transactions/final?acc=${accountNumber}&startDate=${startDate}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10)",
          "token": "d2bc82dd-191e-4876-a074-914da65ce724kxYZ6L2CPSDAzIVsFSAKZz5p9pK2FiJ/nRaaH6UShj6eU8/QDOkJvczkO8Hwt044lIM/6osbDAjUTXGnQ0qLBQHGXGRIc5KJX3tJ32Ps4xG54aRNku35MahqtwtajXiGeybMSp1NU6Lm4ZqVurGv0wLBYEaIj9Fy8WnuzQQI+6lQ+H80HhhPwFyLmLAgbl3b32U9Ecf/oxYSPIztY4ZW2KYJZSrRheZlu/cIM6OCt5iSX9QIBloWZbsL+f7cx3kTmA==",
          "Content-Type": "application/json;charset=cp1251"
        }
      }
    );
    res.json({ balance_data: response.data, transactions_data: responseTransactions.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

function generateOTP() {
  // Генеруємо випадковий 6-значний OTP
  return Math.floor(100000 + Math.random() * 900000);
}

async function generateHash() {
  try {
    const response = await axios.get("https://api.deals.systems/hash-make/32");
    return response.data.response;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function generateOtp({ cardNumber, expirationDate, phone }) {
  try {
    const response = await axios.post(
      "https://bank.deals.systems/card/api/v2/verify/OTP",
      {
        phone : phone,
        card: cardNumber,
        expiry: expirationDate,
        type: "UZCARD"
      },
      {
        headers: {
          Authorization: "Basic ZGVhbHM6cX03WGQ1MlsxSjxO"
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function confirmOtp({ id, code }) {
  try {
    const response = await axios.post(
      "https://bank.deals.systems/card/api/v1/verify/confirm",
      {
        id,
        code,
        type: "UZCARD",
        payer: "CO_BORROWER"
      },
      {
        headers: {
          Authorization: "Basic ZGVhbHM6cX03WGQ1MlsxSjxO"
        }
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});