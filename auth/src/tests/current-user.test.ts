import { app } from '../app';
import { cleanupQuery } from '../models';
import { tester, prepareTest, getAuthCookie } from './config/setup';

describe('current-user test', () => {
  const EMAIL = 'current-user@example.com';
  let cookie: string;

  beforeAll(async () => {
    await prepareTest();
    cookie = await getAuthCookie(EMAIL);
  });

  afterAll(async () => {
    await app.pg.query(cleanupQuery`email ${EMAIL}`);
  });

  it('GET "/currentUser" sends {email: EMAIL}', async () => {
    const res = await app.inject({
      method: 'get',
      url: '/currentUser',
      payload: {
        ...tester,
        email: EMAIL,
      },
      cookies: {
        token: cookie,
      },
    });

    const body = JSON.parse(res.body);

    expect(res.statusCode).toBe(200);
    expect(body.email).toBe(EMAIL);
  });

  it('GET "/currentUser" sends UnAuthroized when token cookie is not sent', async () => {
    const res = await app.inject({
      method: 'get',
      url: '/currentUser',
      payload: {
        email: 'abc@example',
        password: '1234',
      },
    });

    const body = JSON.parse(res.body);

    expect(res.statusCode).toBe(401);
  });

  it('GET "/currentUser" sends UnAuthroized when token cookie is invalid', async () => {
    const res = await app.inject({
      method: 'get',
      url: '/currentUser',
      payload: {
        email: 'abc@example.com',
        password: '12',
      },
      cookies: {
        token: cookie + 'garbage',
      },
    });

    const body = JSON.parse(res.body);

    expect(res.statusCode).toBe(401);
  });
});
