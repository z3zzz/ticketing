import { app } from '../app';
import { cleanupQuery } from '../models';
import { tester, prepareTest, getAuthCookie } from './config/setup';

describe('remove-user test', () => {
  const EMAIL = 'removeUser@example.com';

  beforeAll(async () => {
    await prepareTest();
  });

  afterAll(async () => {
    await app.pg.query(cleanupQuery`email ${EMAIL}`);
  });

  it('POST "/removeUser" sends Bad Request for email', async () => {
    const res = await app.inject({
      method: 'post',
      url: '/removeUser',
      payload: {
        email: 'abc@example',
        password: '1234',
      },
    });

    const body = JSON.parse(res.body);

    expect(res.statusCode).toBe(400);
    expect(body.message).toMatch(/email/);
  });

  it('POST "/removeUser" sends Bad Request for password', async () => {
    const res = await app.inject({
      method: 'post',
      url: '/removeUser',
      payload: {
        email: 'abc@example.com',
        password: '12',
      },
    });

    const body = JSON.parse(res.body);

    expect(res.statusCode).toBe(400);
    expect(body.message).toMatch(/password/);
  });

  it('POST "/removeUser" sends Bad Request wrong credential-email', async () => {
    const res = await app.inject({
      method: 'post',
      url: '/removeUser',
      payload: {
        ...tester,
        email: 'wrong@example.com',
      },
    });

    const body = JSON.parse(res.body);

    expect(res.statusCode).toBe(400);
    expect(body.message).toMatch(/This email does not exist/i);
  });

  it('POST "/removeUser" sends Bad Request wrong credential-password', async () => {
    await getAuthCookie(EMAIL);

    const res = await app.inject({
      method: 'post',
      url: '/removeUser',
      payload: {
        email: EMAIL,
        password: '4321dakfoba241',
      },
    });

    const body = JSON.parse(res.body);

    expect(res.statusCode).toBe(400);
    expect(body.message).toMatch(/Password does not match/i);
  });

  it('POST "/removeUser" sends {result: success} deleting "token" cookie', async () => {
    await getAuthCookie(EMAIL);

    const res = await app.inject({
      method: 'post',
      url: '/removeUser',
      payload: {
        ...tester,
        email: EMAIL,
      },
    });

    const body = JSON.parse(res.body);

    const cookieObj = expect.objectContaining({ name: 'token', value: '' });

    expect(res.statusCode).toBe(200);
    expect(res.cookies).toContainEqual(cookieObj);
    expect(body.result).toBe('success');
  });
});
