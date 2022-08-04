import { app } from '../app';
import { cleanupQuery } from '../models';
import { tester, prepareTest, getAuthCookie } from './config/setup';

describe('signin test', () => {
  const EMAIL = 'signin@example.com';

  beforeAll(async () => {
    await prepareTest();
  });

  afterAll(async () => {
    await app.pg.query(cleanupQuery`email ${EMAIL}`);
  });

  it('POST "/signin" sends {email: EMAIL} with "token" cookie', async () => {
    const cookie = await getAuthCookie(EMAIL);

    const res = await app.inject({
      method: 'post',
      url: '/signin',
      payload: {
        ...tester,
        email: EMAIL,
      },
    });

    const body = JSON.parse(res.body);

    const cookieObj = expect.objectContaining({ name: 'token' });

    expect(res.statusCode).toBe(200);
    expect(res.cookies).toContainEqual(cookieObj);
    expect(body.email).toBe(EMAIL);
  });

  it('POST "/signin" sends Bad Request for email', async () => {
    const res = await app.inject({
      method: 'post',
      url: '/signin',
      payload: {
        email: 'abc@example',
        password: '1234',
      },
    });

    const body = JSON.parse(res.body);

    expect(res.statusCode).toBe(400);
    expect(body.message).toMatch(/email/);
  });

  it('POST "/signin" sends Bad Request for password', async () => {
    const res = await app.inject({
      method: 'post',
      url: '/signin',
      payload: {
        email: 'abc@example.com',
        password: '12',
      },
    });

    const body = JSON.parse(res.body);

    expect(res.statusCode).toBe(400);
    expect(body.message).toMatch(/password/);
  });

  it('POST "/signin" sends Bad Request wrong credential', async () => {
    const res = await app.inject({
      method: 'post',
      url: '/signin',
      payload: {
        email: 'wrong@example.com',
        password: '1234',
      },
    });

    const body = JSON.parse(res.body);

    expect(res.statusCode).toBe(400);
    expect(body.message).toMatch(/signin failed. please check/i);
  });
});
