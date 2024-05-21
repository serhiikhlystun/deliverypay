import React, { useEffect, useState } from 'react';
import CartItem from './../../components/CartItem/CartItem';
import Delivery from './../../components/Auth/Delivery';
import { useQuery, useMutation } from 'react-query';
import getData from '@/queries/getData';
import setData from '@/helpers/setData';
import fetchData from '@/helpers/fetchData';
import { getSession, updateSession } from '@/queries/sessions';
import useStore from '@/store/temp_order';
import { getCurrentUser } from '@/queries/Users';
import { useSession } from 'next-auth/react';

const CartPage = () => {
  const [prices, setPrices] = useState({});
  const [deviceClass, setDeviceClass] = useState('desk');
  const { data: userSession, status } = useSession();

  const { data: session, isSuccess } = useQuery(
    ['session'],
    async () => await getData(getSession, 'session_by_id', { id: localStorage.getItem('session_id') })
  );
  const { tempOrder, setInitialTempOrder, deleteFromTempOrder, updateTempOrder } = useStore();
  const mutation = useMutation(newSession => {
    setData(updateSession, { data: newSession, id: localStorage.getItem('session_id') });
  });

  const { data: user, isUserSuccess } = useQuery(
    ['currentUser'],
    async () => await fetchData(getCurrentUser, {}, '/system', userSession.user.accessToken),
    {
      enabled: status === 'authenticated',
    }
  );

  useEffect(() => {
    if (window.innerWidth < 440) {
      setDeviceClass('mobile');
    }
  }, []);

  useEffect(() => {
    if (isSuccess && session && session.temp_order) {
      setInitialTempOrder(session.temp_order);
    }
    calculatePrices();
  }, [isSuccess, session]);

  const calculatePrices = () => {
    let tempTotal = { totalPrice: 0 };
    session &&
      session?.temp_order &&
      session.temp_order.forEach(item => {
        let price = Number(item.new_price ? item.new_price : item.price);
        let priceAll = price * item.quantity;
        tempTotal.totalPrice = (Number(tempTotal.totalPrice) + priceAll).toFixed(2);
        tempTotal.discount = 2.5;
      });
    setPrices(tempTotal);
  };

  const deleteFromCart = (e, id) => {
    e.preventDefault();
    deleteFromTempOrder(id);
    mutation.mutate({
      status: 'draft',
      temp_order: useStore.getState().tempOrder,
    });
  };

  const updateOrder = (id, count) => {
    updateTempOrder(id, count);
    mutation.mutate({
      status: 'draft',
      temp_order: useStore.getState().tempOrder,
    });
    calculatePrices();
  };

  if (!useStore.getState().tempOrder.length) {
    return (
      <section>
        <div className="container">
          <h2 className="cart__title">PRODUCT CART</h2>
          <h3 className="cart__title-small">PRODUCT ITEMS</h3>
          <div className="cart__wrapp">YOUR CART IS EMPTY</div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="container">
        <h2 className="cart__title">PRODUCT CART</h2>
        <h3 className="cart__title-small">PRODUCT ITEMS</h3>
        <div className="cart__wrapp">
          <div className="cart-list__wrapp">
            <ul className="cart-list">
              {tempOrder.map((item, index) => (
                <CartItem key={index} item={item} updateOrder={updateOrder} deleteFromCart={deleteFromCart} />
              ))}
            </ul>
          </div>
            <Delivery prices={prices} products={session?.temp_order} user={user} deviceClass={deviceClass} />
        </div>
      </div>
    </section>
  );
};

export default CartPage;
