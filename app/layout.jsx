import "./../sass/main.sass";
import Head from "next/head";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import TextSlider from "@/components/TextSlider/TextSlider";

function RootLayout({ children }) {
  return (
    <>
      <Head>
        <title>E-commerce Site</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <TextSlider />
      {children}
      <Footer />
    </>
  );
}

export default RootLayout;
