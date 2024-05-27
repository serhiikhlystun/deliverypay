'use client';
import './../sass/main.sass';
import Head from 'next/head';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import TextSlider from '@/components/TextSlider/TextSlider';
import { SessionProvider } from 'next-auth/react';
import favicon from './favicon.png';

function RootLayout({ children, session }) {

  return (
    <>
      <Head>
      <meta name="viewport" content="width=device-width, user-scalable=no" />
        <title>E-commerce Site</title>
        <link rel="icon" href={favicon.src} />
      </Head>
      <SessionProvider session={session}>
        <Header />
        <TextSlider />
        {children}
        <Footer />
      </SessionProvider>
    </>
  );
}

export default RootLayout;
