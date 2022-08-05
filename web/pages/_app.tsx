import { AppProps } from 'next/app';
import { store } from '../states';
import { Provider } from 'react-redux';
import '../styles/globals.css';
import Header from '../components/header';
import { useProtectPages } from '../hooks';

function MyApp({ Component, pageProps }: AppProps) {
  const { isOpen, isBeforeLogin, isAfterLogin } = useProtectPages(pageProps);

  return (
    <Provider store={store}>
      <Header />
      {isOpen && <Component {...pageProps} />}
      {isBeforeLogin && <Component {...pageProps} />}
      {isAfterLogin && <Component {...pageProps} />}
    </Provider>
  );
}

export default MyApp;
