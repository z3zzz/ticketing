import { AppProps } from 'next/app';
import { store } from '../states';
import { Provider } from 'react-redux';
import '../styles/globals.css';
import Header from '../components/header';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
