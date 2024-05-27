import RootLayout from './../app/layout';
import { QueryClientProvider, QueryClient } from 'react-query';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: 'E-commerce Site',
  description: 'Generated by create next app',
};
const queryClient = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  return (
    <QueryClientProvider client={queryClient}>
      <RootLayout session={session}>
        <Component {...pageProps} />
        {/* <ToastContainer /> */}
      </RootLayout>
    </QueryClientProvider>
  );
}

export default MyApp;
