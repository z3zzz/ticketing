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

  it('POST "/signout" sends Bad Request for email', async () => {
    const res = await app.inject({
      method: 'post',
      url: '/signout',
      payload: {
        email: 'abc@example',
        password: '1234',
      },
    });

    const body = JSON.parse(res.body);

    expect(res.statusCode).toBe(400);
    expect(body.message).toMatch(/email/);
  });

  it('POST "/signout" sends Bad Request for password', async () => {
    const res = await app.inject({
      method: 'post',
      url: '/signout',
      payload: {
        email: 'abc@example.com',
        password: '12',
      },
    });

    const body = JSON.parse(res.body);

    expect(res.statusCode).toBe(400);
    expect(body.message).toMatch(/password/);
  });

  it('POST "/signout" sends Bad Request wrong credential-email', async () => {
    const res = await app.inject({
      method: 'post',
      url: '/signout',
      payload: {
        ...tester,
        email: 'wrong@example.com',
      },
    });

    const body = JSON.parse(res.body);

    expect(res.statusCode).toBe(400);
    expect(body.message).toMatch(/This email does not exist/i);
  });

  it('POST "/signout" sends Bad Request wrong credential-password', async () => {
    await getAuthCookie(EMAIL);

    const res = await app.inject({
      method: 'post',
      url: '/signout',
      payload: {
        email: EMAIL,
        password: '4321dakfoba241',
      },
    });

    const body = JSON.parse(res.body);

    expect(res.statusCode).toBe(400);
    expect(body.message).toMatch(/Password does not match/i);
  });

  it('POST "/signout" sends {result: success} deleting "token" cookie', async () => {
    const cookie = await getAuthCookie(EMAIL);

    const res = await app.inject({
      method: 'post',
      url: '/signout',
      payload: {
        ...tester,
        email: EMAIL,
      },
    });

    const body = JSON.parse(res.body);

    const cookieObj = expect.objectContaining({ name: 'token', value: cookie });
    const cookies = expect.arrayContaining([cookieObj]);

    expect(res.statusCode).toBe(200);
    expect(res.cookies).not.toEqual(cookies);
    expect(body.result).toBe('success');
  });
});
