import React, { useState } from 'react';
import './Auth.sass';
import CheckoutPrices from './CheckoutPrices';
import GuestCartPopup from '@/components/Popups/GuestCart';
import Success from '../Popups/Success';
import { useMutation } from 'react-query';
import setData from '@/helpers/setData';
import { createOrder } from '@/queries/orderQueries';

const Delivery = ({ prices, deviceClass, products, user, status }) => {
  const [isOpen, setIsOpen] = useState(false);

  console.log(user);

  const mutation = useMutation(order => {
    setData(createOrder, { data: order }, '', userSession.user.accessToken);
  });

  const handleSubmit = e => {
    e.preventDefault();

    setIsOpen(true);

    const arr = [];

    products.forEach(element => {
      arr.push({
        products_id: Number(element.product_id),
        quantity: element.quantity,
      });
    });
    mutation.mutate({
      user_id: user.id,
      products: arr,
    });
  };

  const handleClosePopup = () => {
    setIsOpen(false);
  };

  console.log(user);

  return (
    <div className="delivery__content">
      {status === 'unauthenticated' ? (
        <>
          <GuestCartPopup />
          <CheckoutPrices prices={prices} status={status} deviceClass={deviceClass} />
        </>
      ) : (
        <>
          <div className="delivery__title-wrapp">
            <h2 className="delivery__title">Delivery INFORMATION</h2>
            <p className="delivery__subtitle">YOU CAN CHANGE INFORMATION</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="delivery__input-wrapp">
              <input
                className="delivery__input"
                name="name"
                defaultValue={user.first_name ?? '' + ' ' + user.last_name ?? ''}
                required
                type="text"
                placeholder="Name"
              />
              <input className="delivery__input" name="email" defaultValue={user.email} required type="email" placeholder="Email" />
              <input className="delivery__input" name="phone" defaultValue={user.phone} required type="number" placeholder="PHONE" />
              <input className="delivery__input" name="adress" defaultValue={user.location} required type="text" placeholder="ADDRESS " />
              {/* <input className="delivery__input" name="tg" type="text" placeholder="TG USERNAME" /> */}
            </div>
            <CheckoutPrices prices={prices} status={status} deviceClass={deviceClass} />
          </form>
        </>
      )}
      {isOpen && <Success onClose={handleClosePopup} />}
    </div>
  );
};

export default Delivery;
