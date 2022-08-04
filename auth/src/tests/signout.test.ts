import { app } from '../app';
import { cleanupQuery } from '../models';
import { tester, prepareTest, getAuthCookie } from './config/setup';

describe('signout test', () => {
  const EMAIL = 'signout@example.com';

  beforeAll(async () => {
    await prepareTest();
  });

  afterAll(async () => {
    await app.pg.query(cleanupQuery`email ${EMAIL}`);
  });

  it('GET "/signout" sends {result: success} deleting "token" cookie', async () => {
    const cookie = await getAuthCookie(EMAIL);

    const res = await app.inject({
      method: 'get',
      url: '/signout',
      payload: {
        ...tester,
        email: EMAIL,
      },
      cookies: {
        token: cookie,
      },
    });

    const body = JSON.parse(res.body);

    const cookieObj = expect.objectContaining({ name: 'token', value: '' });

    expect(res.statusCode).toBe(200);
    expect(res.cookies).toContainEqual(cookieObj);
    expect(body.result).toBe('success');
  });
});
