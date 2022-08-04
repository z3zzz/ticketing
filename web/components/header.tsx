import { useEffect } from 'react';
import { doLogin, doLogout, useAppDispatch, useAppSelector } from '../states';
import { sendRequest } from '../utils';
import Link from './link';
import styles from './header.module.scss';

const Header: React.FC = () => {
  const { isLogin, user } = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    dispatch(doLogout());
  };

  useEffect(() => {
    if (isLogin) {
      return;
    }

    sendRequest({ method: 'GET', path: '/api/auth/currentUser' }).then(
      ({ data, isError }) => {
        if (isError) {
          return;
        }

        dispatch(doLogin(data));
      }
    );
  }, []);

  return (
    <header className="header">
      <div className={styles.container}>
        <nav className={styles.nav}>
          <div className={styles.links}>
            <Link href="/" title="TicketCreature" className={styles.linkLogo} />
            {!isLogin && (
              <Link href="/signup" title="Signup" className={styles.link} />
            )}
            {!isLogin && (
              <Link href="/signin" title="Signin" className={styles.link} />
            )}
            {isLogin && (
              <button className={styles.button} onClick={onClick}>
                signout
              </button>
            )}
          </div>
        </nav>
        <div className={styles.userBox}>
          {isLogin && (
            <span className={styles.user}>Welcome, {user.email}</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
