import React, { useState } from 'react';
import './CartItem.sass';

const assetsUrl = process.env.NEXT_PUBLIC_ASSETS_URL;

const CartItem = ({ image, product_name, brand, price, priceOld, id, quantity, deleteFromCart }) => {
  const [count, setCount] = useState(quantity);

  const handleIncrement = () => {
    setCount(count + 1);
  };
  const handleDecrement = () => {
    setCount(() => (count > 1 ? count - 1 : count));
  };

  const handleChangeInput = e => {
    let number = e.target.value.match(/\d+/g);
    if (number[1] !== undefined) {
      setCount(() => Number(number[1]));
    } else {
      setCount(number[0].charAt(number[0].length - 1));
    }
  };

  return (
    <li className="cart-list-item">
      <div className="cart-list-item__img-box">
        <img src={`${assetsUrl}/${image}?width=580&height=700`} className="cart-list-item__img" alt="" />
      </div>
      <div className="cart-list-item__content">
        <div className="cart-list-item__title-inn">
          <div className="cart-list-item__title-box">
            <h3 className="cart-list-item__title">{product_name}</h3>
            <p className="cart-list-item__subtitle">{brand}</p>
          </div>
          <div className="cart-list-item__like">
            <svg
            onClick={()=>deleteFromCart(id)}
              className="cart-list-item__like-icon"
              width="41"
              height="39"
              viewBox="0 0 41 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1.19531"
                y="0.25"
                width="39.5363"
                height="37.5892"
                rx="18.7946"
                stroke="#AAAAAA"
                strokeWidth="0.5"
              />
              <g clipPath="url(#clip0_2099_1834)">
                <path
                  d="M25.0077 25.1728C24.99 25.5505 24.6776 25.847 24.2995 25.8451L17.7149 25.811C17.3369 25.8091 17.0275 25.5093 17.0137 25.1315L16.5948 15.2024L25.5293 15.2486L25.0077 25.1728ZM19.5598 17.6834C19.5606 17.5252 19.433 17.3963 19.2748 17.3954L18.8165 17.3931C18.6584 17.3923 18.5294 17.5198 18.5286 17.678L18.4992 23.3494C18.4984 23.5076 18.626 23.6365 18.7842 23.6373L19.2425 23.6397C19.4006 23.6405 19.5296 23.513 19.5304 23.3547L19.5598 17.6834ZM21.5649 17.6937C21.5657 17.5356 21.4381 17.4066 21.2799 17.4058L20.8217 17.4034C20.6635 17.4026 20.5345 17.5302 20.5337 17.6884L20.5044 23.3598C20.5036 23.518 20.6311 23.6469 20.7894 23.6477L21.2476 23.6501C21.4058 23.6509 21.5347 23.5234 21.5355 23.3651L21.5649 17.6937ZM23.57 17.7041C23.5708 17.5459 23.4433 17.417 23.285 17.4162L22.8268 17.4138C22.6686 17.413 22.5397 17.5406 22.5388 17.6988L22.5095 23.3701C22.5087 23.5283 22.6363 23.6573 22.7945 23.6581L23.2528 23.6604C23.4109 23.6613 23.5399 23.5337 23.5407 23.3755L23.57 17.7041Z"
                  fill="#686868"
                />
                <path
                  d="M16.2956 12.5099L19.3333 12.5256L19.3363 11.9513C19.3367 11.8698 19.4032 11.804 19.4848 11.8044L22.6747 11.8209C22.7563 11.8213 22.822 11.8878 22.8216 11.9694L22.8186 12.5436L25.8564 12.5593C26.1009 12.5606 26.298 12.7598 26.2967 13.0043L26.2895 14.3948L15.8435 14.3408L15.8507 12.9503C15.852 12.7058 16.0512 12.5087 16.2956 12.5099Z"
                  fill="#686868"
                />
              </g>
              <defs>
                <clipPath id="clip0_2099_1834">
                  <rect
                    width="14.0156"
                    height="14.0156"
                    fill="white"
                    transform="matrix(-0.999987 -0.00517123 -0.00517123 0.999987 28.0879 11.8489)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <div className="cart-list-item__btn-wrapp">
          <div className="cart-list-item__price-wrapp">
            {price ? (
              <>
                <p className="cart-list-item__price">${price}</p>
                <p className="cart-list-item__price-old">${priceOld}</p>
              </>
            ) : (
              <p className="cart-list-item__price">${priceOld}</p>
            )}
          </div>
          <div className="cart-list-item__counter">
            <svg
              onClick={handleDecrement}
              className="cart-list-item__counter-item"
              width="20"
              height="20"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_2079_1831)">
                <path
                  d="M-1.89961 8.75V8.8H-1.84961H14.835H14.885V8.75V7.27051V7.22051H14.835H-1.84961H-1.89961V7.27051V8.75Z"
                  fill="black"
                  stroke="black"
                  strokeWidth="0.1"
                />
              </g>
              <defs>
                <clipPath id="clip0_2079_1831">
                  <rect width="15" height="15" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <input
              className="cart-list-item__counter-input"
              type="text"
              value={`${count}X`}
              onChange={handleChangeInput}
            />
            <svg
              onClick={handleIncrement}
              className="cart-list-item__counter-item"
              width="20"
              height="20"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.09805 0.95H7.04805V1V7.55H0.498047H0.448047V7.6V9.4V9.45H0.498047H7.04805V16V16.05H7.09805H8.89805H8.94805V16V9.45H15.498H15.548V9.4V7.6V7.55H15.498H8.94805V1V0.95H8.89805H7.09805Z"
                fill="black"
                stroke="black"
                strokeWidth="0.1"
              />
            </svg>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
