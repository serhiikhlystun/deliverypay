import './Profile.sass';
import React, { useState, useEffect } from 'react';
import WishListItem from '../WishListItem/WishListItem';
import OrderItem from '../OrderItem/OrderItem';
import SettingsPopup from '../Popups/Settings';
import { useQuery, useMutation } from 'react-query';
import { getSession, updateSession } from '@/queries/sessions';
import useStore from '@/store/temp_order';
import getData from '@/queries/getData';
import setData from '@/helpers/setData';
import { v4 as uuidv4 } from 'uuid';
import { getCurrentUser, updateCurrentUser } from '@/queries/Users';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const orderItems = [
  {
    number: '0012',
    status: 'Done',
    address: 'Chicago 123, avenu streeet',
    quantity: '7',
    total: '$59.90',
  },
  {
    number: '0112',
    status: 'Done',
    address: 'Chicago 222, avenu',
    quantity: '2',
    total: '$17.90',
  },
  {
    number: '1211',
    status: 'PENDING',
    address: 'NEW YORK 123, avenu streeet',
    quantity: '11',
    total: '$52.11',
  },
  {
    number: '0111',
    status: 'In Progress',
    address: 'Chicago 123, avenu streeet',
    quantity: '7',
    total: '$59.90',
  },
];

const fetchData = async (query, token, { variables = {} }) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const res = await fetch('https://crm.web3flow.online/graphql/system', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors);
  }

  return json.data.users_me;
};

const setUpdatedUser = async (mutation, token, data = {}) => {
  const query = JSON.stringify({
    query: mutation,
    variables: data,
  });

  const response = await fetch('https://crm.web3flow.online/graphql/system', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    body: query,
  });

  const responseJson = await response.json();
  return responseJson.data;
};

const Profile = () => {
  const router = useRouter();
  const { data: userSession, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/');
    },
  });

  const { data: user, isUserSuccess } = useQuery(
    ['currentUser'],
    async () => await fetchData(getCurrentUser, userSession.user.accessToken, {}),
    {
      enabled: status === 'authenticated',
    }
  );

  const { data: session, isSuccess } = useQuery(
    ['session'],
    async () => await getData(getSession, 'session_by_id', { id: localStorage.getItem('session_id') })
  );

  const mutation = useMutation(newSession => {
    setData(updateSession, { data: newSession, id: localStorage.getItem('session_id') });
  });

  const { addToTempOrder, wishList, setInitialTempOrder, setInitialWishList, deleteFromWishList } =
    useStore();

  // Отримання списків бажань та корзини
  useEffect(() => {
    if (isSuccess && session) {
      if (session.temp_order) {
        setInitialTempOrder(session.temp_order);
      }
      if (session.wish_list) {
        setInitialWishList(session.wish_list);
      }
    }
  }, [isSuccess, session]);

  // Видалення продукту зі списку бажань
  const deleteFromWishes = (e, id) => {
    e.preventDefault();
    deleteFromWishList(id);
    mutation.mutate({
      status: 'draft',
      wish_list: useStore.getState().wishList,
    });
  };

  // Стан для відображення попапа
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
    document.body.style.setProperty('overflow', 'hidden');
  };

  // Обробник закриття попапа
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  // Додає продукт до корзини
  const addToCart = (e, item) => {
    e.preventDefault();
    addToTempOrder({
      product_id: item.id,
      image: item.image,
      product_name: item.product_name,
      new_price: item.new_price,
      price: item.price,
      brand: item.brand,
      quantity: 1,
      id: uuidv4(),
      slug: item.slug,
      category_slug: item.category_slug,
      subcategory_slug: item.subcategory_slug,
    });
    mutation.mutate({
      status: 'draft',
      temp_order: useStore.getState().tempOrder,
    });
  };

  const updateMutation = useMutation(
    updatedUser => {
      status === 'authenticated' && setUpdatedUser(updateCurrentUser, userSession.user.accessToken, { data: updatedUser });
    },
  );

  const handleUpdate = e => {
    e.preventDefault(
      updateMutation.mutate({
        email: e.target.email.value,
        password: e.target.password.value,
        location: e.target.location.value,
        phone: e.target.phone.value,
      })
    );
  };

  if (status !== 'authenticated') return null;

  return (
    <section className="profile">
      <div className="container">
        <div className="profile__wrapp">
          <h2 className="profile__title">
            {user?.email}
            <svg
              onClick={handleOpenPopup}
              width="31"
              height="31"
              viewBox="0 0 31 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_2001_656)">
                <path
                  d="M29.4041 12.0556H26.5039C26.0377 12.0556 25.6536 11.7989 25.4751 11.3684C25.2966 10.9378 25.3873 10.4843 25.7162 10.1548L27.7668 8.10478C28.0682 7.80339 28.2341 7.40211 28.2341 6.97615C28.2341 6.54961 28.0682 6.14891 27.7668 5.84694L25.1531 3.23319C24.5503 2.63041 23.4991 2.62926 22.8952 3.23319L20.8452 5.2832C20.5157 5.61215 20.061 5.704 19.6316 5.52489C19.2011 5.34635 18.9444 4.9623 18.9444 4.49615V1.59593C18.9444 0.71587 18.2286 0 17.3485 0H13.6515C12.7714 0 12.0556 0.71587 12.0556 1.59593V4.49615C12.0556 4.9623 11.7989 5.34635 11.3684 5.52489C10.939 5.70457 10.4843 5.61215 10.1548 5.2832L8.10478 3.23319C7.50085 2.62926 6.44972 2.63041 5.84694 3.23319L3.23319 5.84694C2.9318 6.14833 2.76589 6.54961 2.76589 6.97615C2.76589 7.40211 2.9318 7.80281 3.23319 8.10478L5.28378 10.1548C5.61272 10.4843 5.70285 10.9378 5.52489 11.3684C5.34693 11.7989 4.9623 12.0556 4.49615 12.0556H1.59593C0.71587 12.0556 0 12.7714 0 13.6515V17.3479C0 18.2286 0.71587 18.9444 1.59593 18.9444H4.49615C4.9623 18.9444 5.34635 19.2011 5.52489 19.6316C5.70343 20.0622 5.61272 20.5157 5.28378 20.8452L3.23319 22.8952C2.9318 23.1966 2.76589 23.5979 2.76589 24.0239C2.76589 24.4504 2.9318 24.8511 3.23319 25.1531L5.84694 27.7668C6.4503 28.3702 7.50085 28.3713 8.10478 27.7668L10.1548 25.7162C10.4843 25.3873 10.9373 25.2966 11.3684 25.4751C11.7989 25.6536 12.0556 26.0377 12.0556 26.5039V29.4041C12.0556 30.2841 12.7714 31 13.6515 31H17.3479C18.228 31 18.9439 30.2841 18.9439 29.4041V26.5039C18.9439 26.0377 19.2005 25.6536 19.631 25.4751C20.0622 25.296 20.5151 25.3873 20.8446 25.7162L22.8946 27.7668C23.4986 28.3707 24.5497 28.3696 25.1525 27.7668L27.7662 25.1531C28.0676 24.8517 28.2335 24.4504 28.2335 24.0239C28.2335 23.5979 28.0676 23.1972 27.7662 22.8952L25.7156 20.8452C25.3867 20.5157 25.2966 20.0622 25.4745 19.6316C25.6525 19.2011 26.0377 18.9444 26.5039 18.9444H29.4041C30.2841 18.9444 31 18.2286 31 17.3485V13.6515C31 12.7714 30.2841 12.0556 29.4041 12.0556ZM29.8519 17.3485C29.8519 17.5954 29.6509 17.7963 29.4041 17.7963H26.5039C25.5716 17.7963 24.7707 18.3313 24.4142 19.1924C24.0571 20.0536 24.2449 20.9985 24.9045 21.6575L26.9551 23.7075C27.1302 23.8826 27.1302 24.1668 26.9551 24.3413L24.3413 26.9551C24.1668 27.1296 23.8826 27.1307 23.7075 26.9551L21.6575 24.9045C20.9979 24.2449 20.0536 24.0583 19.1924 24.4142C18.3313 24.7707 17.7963 25.5716 17.7963 26.5039V29.4041C17.7963 29.6509 17.5954 29.8519 17.3485 29.8519H13.6515C13.4046 29.8519 13.2037 29.6509 13.2037 29.4041V26.5039C13.2037 25.5716 12.6687 24.7707 11.8076 24.4142C11.5188 24.2942 11.2214 24.2357 10.9275 24.2357C10.3454 24.2357 9.78107 24.4653 9.34248 24.9039L7.29246 26.9545C7.1168 27.1302 6.83263 27.129 6.65869 26.9545L4.04493 24.3407C3.86983 24.1656 3.86983 23.8815 4.04493 23.707L6.09552 21.6569C6.75456 20.9979 6.94285 20.053 6.58578 19.1919C6.22928 18.3313 5.42844 17.7963 4.49615 17.7963H1.59593C1.34907 17.7963 1.14815 17.5954 1.14815 17.3485V13.6515C1.14815 13.4046 1.34907 13.2037 1.59593 13.2037H4.49615C5.42844 13.2037 6.22928 12.6687 6.58578 11.8076C6.94285 10.9464 6.75513 10.0015 6.09552 9.34248L4.04493 7.29246C3.86983 7.11737 3.86983 6.8332 4.04493 6.65869L6.65869 4.04493C6.8332 3.86983 7.11737 3.86983 7.29246 4.04493L9.34248 6.09494C10.0009 6.75341 10.9453 6.94228 11.8076 6.5852C12.6687 6.22928 13.2037 5.42844 13.2037 4.49615V1.59593C13.2037 1.34907 13.4046 1.14815 13.6515 1.14815H17.3479C17.5954 1.14815 17.7963 1.34907 17.7963 1.59593V4.49615C17.7963 5.42844 18.3313 6.22928 19.1924 6.58578C20.0547 6.94285 20.9985 6.75456 21.6575 6.09552L23.7075 4.0455C23.8832 3.87041 24.1674 3.87041 24.3413 4.0455L26.9551 6.65926C27.1302 6.83435 27.1302 7.11852 26.9551 7.29304L24.9045 9.34306C24.2454 10.0021 24.0571 10.947 24.4142 11.8081C24.7707 12.6692 25.5716 13.2043 26.5039 13.2043H29.4041C29.6509 13.2037 29.8519 13.4046 29.8519 13.6515V17.3485Z"
                  fill="black"
                />
                <path
                  d="M15.5007 10.3333C12.6515 10.3333 10.334 12.6509 10.334 15.5C10.334 18.3491 12.6515 20.6667 15.5007 20.6667C18.3498 20.6667 20.6673 18.3491 20.6673 15.5C20.6673 12.6509 18.3498 10.3333 15.5007 10.3333ZM15.5007 19.5185C13.2853 19.5185 11.4821 17.7154 11.4821 15.5C11.4821 13.2847 13.2853 11.4815 15.5007 11.4815C17.716 11.4815 19.5192 13.2847 19.5192 15.5C19.5192 17.7154 17.716 19.5185 15.5007 19.5185Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_2001_656">
                  <rect width="31" height="31" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </h2>
          <p className="profile__subtitle">{user?.location}</p>
        </div>
        <h2 className="wish-list__title">My WISH LIST</h2>
        <div className="wish-list__wrapp">
          {useStore.getState().wishList.length ? (
            <>
              <ul className="wish-list">
                {wishList.map((item, index) => (
                  <WishListItem
                    key={index}
                    item={item}
                    deleteFromWishes={deleteFromWishes}
                    addToCart={addToCart}
                  />
                ))}
              </ul>
              <div className="wish-list__more">
                <button className="wish-list__more-btn">Load more</button>
              </div>
            </>
          ) : (
            <h3 className="wish-list__title">YOUR WISH LIST IS EMPTY</h3>
          )}
        </div>
        <div className="order__wrapp">
          <ul className="order">
            {orderItems.map((item, index) => (
              <OrderItem
                key={index}
                number={item.number}
                status={item.status}
                address={item.address}
                quantity={item.quantity}
                total={item.total}
              />
            ))}
          </ul>
          <div className="order__more">
            <button className="order__more-btn">Load more</button>
          </div>
        </div>
        {isPopupOpen && <SettingsPopup onClose={handleClosePopup} user={user} handleUpdate={handleUpdate} />}
      </div>
    </section>
  );
};

export default Profile;
