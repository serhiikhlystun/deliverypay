import React, { useEffect, useState } from 'react';
import './Auth.sass';
import CheckoutPrices from './CheckoutPrices';
import GuestCartPopup from '@/components/Popups/GuestCart';
import Success from '../Popups/Success';
import { useMutation } from 'react-query';
import setData from '@/helpers/setData';
import { createOrder, createGuestOrder } from '@/queries/orderQueries';
import { useSession } from 'next-auth/react';

const Delivery = ({ prices, deviceClass, products, user }) => {
  const [name, setName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { data: userSession, status } = useSession();

  const mutation = useMutation(order => {
    setData(createOrder, { data: order }, '', userSession.user.accessToken);
  });

  const mutationGuest = useMutation(order => {
    setData(createGuestOrder, { data: order });
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

    if (user) {
      const { name, email, phone, adress } = e.target;
      const order = {
        user_id: user.id,
        products: arr,
        status: "New",
        name: name.value,
        email: email.value,
        phone: phone.value,
        location: adress.value,
        discount: parseFloat(prices.totalPrice) - (parseFloat(prices.totalPrice) * (1 - prices.discount / 100)).toFixed(2),
        total_price: (parseFloat(prices.totalPrice) * (1 - prices.discount / 100)).toFixed(2),
        // total_price_decimal: (parseFloat(prices.totalPrice) * (1 - prices.discount / 100)).toFixed(2),
      };
      mutation.mutate(order);
    } else {
      const { phone, adress } = e.target;
      const order = {
        guest: true,
        status: "New",
        products: arr,
        phone: phone.value,
        location: adress.value,
        total_price: prices.totalPrice,
        // total_price_decimal: prices.totalPrice.toFixed(2),
      };
      mutationGuest.mutate(order);
    }
  };

  const handleClosePopup = () => {
    setIsOpen(false);
  };

  useEffect(()=>{
    if(user){
      if(user.first_name !== null && user.last_name !== null){
        setName(`${user.first_name} ${user.last_name}`)
      } else if(user.first_name !== null && user.last_name === null){
        setName(user.first_name)
      } else if(user.last_name !== null && user.first_name === null){
        setName(user.last_name)
      }
    }
  },[user])

  return (
    <div className="delivery__content">
      {status === 'unauthenticated' ? (
        <>
          <GuestCartPopup handleGuestSubmit={handleSubmit} />
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
                defaultValue={user?.first_name}
                required
                type="text"
                placeholder="Name"
              />
              <input
                className="delivery__input"
                name="email"
                defaultValue={user?.email}
                required
                type="email"
                placeholder="Email"
              />
              <input
                className="delivery__input"
                name="phone"
                defaultValue={user?.phone}
                required
                type="number"
                placeholder="PHONE"
              />
              <input
                className="delivery__input"
                name="adress"
                defaultValue={user?.location}
                required
                type="text"
                placeholder="DELIVERY ADDRESS "
              />
              {/* <input className="delivery__input" name="tg" type="text" placeholder="TG USERNAME" /> */}
            </div>
            <CheckoutPrices prices={prices} status={status} deviceClass={deviceClass} />
          </form>
        </>
      )}
      {isOpen && <Success onClose={handleClosePopup} user={user ? user : null} />}
    </div>
  );
};

export default Delivery;
