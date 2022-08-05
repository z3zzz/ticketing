import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { sendRequest } from '../utils';

interface UseProtectPageProps {
  isProtected: boolean;
  criteria: string;
}

let path: string;

export const useProtectPages = (pageProps: UseProtectPageProps) => {
  const { isProtected, criteria } = pageProps;
  const [isLogin, setIsLogin] = useState(false);
  const [isAfterRequest, setIsAfterRequest] = useState(false);

  const router = useRouter();
  const pathname = router.pathname;

  if (pathname !== '/signin') {
    path = pathname;
  }

  const isOpen = !isProtected;

  const onlyBeforeLogin = isProtected && criteria === 'beforeLogin';
  const isBeforeLogin = onlyBeforeLogin && isAfterRequest && !isLogin;

  const onlyAfterLogin = isProtected && criteria === 'afterLogin';
  const isAfterLogin = onlyAfterLogin && isAfterRequest && isLogin;

  useEffect(() => {
    if (isOpen) {
      return;
    }

    sendRequest({ method: 'GET', path: '/api/auth/currentUser' }).then(
      ({ isError }) => {
        if (isError) {
          setIsLogin(false);
          onlyAfterLogin && router.replace(`/signin?previous=${path}`);
        } else {
          setIsLogin(true);
          onlyBeforeLogin && router.replace('/');
        }

        setIsAfterRequest(true);
      }
    );
  }, [isOpen, onlyAfterLogin, onlyBeforeLogin, router]);

  return { isOpen, isBeforeLogin, isAfterLogin };
};
