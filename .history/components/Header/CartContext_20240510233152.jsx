import { createContext, useState, useEffect } from 'react';


import { getSession } from '@/queries/sessions';
import getData from '@/queries/getData';
import useStore from '@/store/temp_order';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCartCount = async () => {
      const count = store.tempOrder.reduce((acc, item) => acc + item.quantity, 0)
      setCartCount(count);
    };

    fetchCartCount();
  }, []);


  return (
    <CartContext.Provider value={{ cartCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};