import RootLayout from './../app/layout';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: '420Comrades',
  description: '420Comrades.com',
};
const queryClient = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  return (
    <QueryClientProvider client={queryClient}>
      <RootLayout session={session}>
        <ToastContainer />
        <Component {...pageProps} />
      </RootLayout>
    </QueryClientProvider>
  );
}

export default MyApp;
