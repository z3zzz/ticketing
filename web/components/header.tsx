import { useEffect } from 'react';
import { doLogin, doLogout, useAppDispatch, useAppSelector } from '../states';
import { sendRequest } from '../utils';
import Link from './link';
import styles from './header.module.scss';
import { useRouter } from 'next/router';

enum links {
  home = '/',
  signup = '/signup',
  signin = '/signin',
  tickets = '/tickets',
}

const Header: React.FC = () => {
  const { isLogin, user } = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const currentLink = router.pathname;

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    dispatch(doLogout());
    router.push('/');
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
            <Link
              href={links.home}
              title="TicketCreature"
              className={styles.linkLogo}
            />
            {!isLogin && (
              <Link
                href={links.signup}
                title="Signup"
                className={
                  currentLink === links.signup ? styles.activeLink : styles.link
                }
              />
            )}
            {!isLogin && (
              <Link
                href={links.signin}
                title="Signin"
                className={
                  currentLink === links.signin ? styles.activeLink : styles.link
                }
              />
            )}
            {isLogin && (
              <Link
                href={links.tickets}
                title="Tickets"
                className={
                  currentLink === links.tickets
                    ? styles.activeLink
                    : styles.link
                }
              />
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
