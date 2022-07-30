import './environment-variables';
import { app } from '../../app';
import { initialQuery } from '../../models';

// default user info for auth
export const tester = {
  email: 'tester@test.com',
  password: 'password',
};

export const prepareTest = async (): Promise<void> => {
  // bootstrap all plugins
  await app.inject({ url: '/' });

  // check postgresql connection
  try {
    await app.pg.connect();
    await app.pg.query(initialQuery);
  } catch (err: any) {
    app.log.error(err.message);
    process.exit(1);
  }
};

const authCookies: Record<string, string> = {};
export const getAuthCookie = async (email?: string): Promise<string> => {
  if (email && authCookies[email]) {
    return authCookies[email];
  }

  if (email && !authCookies[email]) {
    await signup(email);
    const cookie = await signin(email);

    authCookies[email] = cookie;

    return cookie;
  }

  await signup();
  const cookie = await signin();

  return cookie;
};

async function signup(email?: string) {
  const res = await app.inject({
    method: 'POST',
    url: '/signup',
    payload: email
      ? {
          ...tester,
          email,
        }
      : tester,
  });
}

async function signin(email?: string) {
  const res = await app.inject({
    method: 'POST',
    url: '/signin',
    payload: email
      ? {
          ...tester,
          email,
        }
      : tester,
  });

  const cookieObj = res.cookies[0] as { name: string; value: string };
  const cookie = cookieObj.value;

  global.authCookie = cookie;

  return cookie;
}
