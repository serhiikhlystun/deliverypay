'use client';
import './../sass/main.sass';
import Head from 'next/head';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import TextSlider from '@/components/TextSlider/TextSlider';
import { SessionProvider } from 'next-auth/react';
import favicon from './favicon.png';
import { Context } from './context';
import { getSession } from '@/queries/sessions';
import { useQuery } from 'react-query';
import getData from '@/queries/getData';
import { useState, useEffect } from 'react';

function RootLayout({ children, session }) {

  const [arr, setArr] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData(getSession, 'session_by_id', { id: localStorage.getItem('session_id') });
        setArr(response.temp_order);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  },[arr]);
  const value = arr;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <title>E-commerce Site</title>
        <link rel="icon" href={favicon.src} />
      </Head>
      <SessionProvider session={session}>
        <Context.Provider value={value}>
          <Header />
          <TextSlider />
          {children}
          <Footer />
        </Context.Provider>
      </SessionProvider>
    </>
  );
}

export default RootLayout;
