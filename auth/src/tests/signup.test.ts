import { app } from '../app';
import { cleanupQuery } from '../models';
import { tester, prepareTest } from './config/setup';

describe('signup test', () => {
  const EMAIL = 'signup@example.com';

  beforeAll(async () => {
    await prepareTest();
  });

  afterAll(async () => {
    await app.pg.query(cleanupQuery`email ${EMAIL}`);
  });

  it('POST "/signup" sends {email: Email} with "token" cookie', async () => {
    const res = await app.inject({
      method: 'post',
      url: '/signup',
      payload: {
        ...tester,
        email: EMAIL,
      },
    });

    const body = JSON.parse(res.body);

    const cookieObj = expect.objectContaining({ name: 'token' });

    expect(res.statusCode).toBe(201);
    expect(res.cookies).toContainEqual(cookieObj);
    expect(body.email).toBe(EMAIL);
  });

  it('POST "/signup" sends Bad Request for email', async () => {
    const res = await app.inject({
      method: 'post',
      url: '/signup',
      payload: {
        email: 'abc@example',
        password: '1234',
      },
    });

    const body = JSON.parse(res.body);

    expect(res.statusCode).toBe(400);
    expect(body.message).toMatch(/email/);
  });

  it('POST "/signup" sends Bad Request for empty email', async () => {
    const res = await app.inject({
      method: 'post',
      url: '/signup',
      payload: {
        password: '1234',
      },
    });

    const body = JSON.parse(res.body);

    expect(res.statusCode).toBe(400);
    expect(body.message).toMatch(/email/);
  });

  it('POST "/signup" sends Bad Request for password', async () => {
    const res = await app.inject({
      method: 'post',
      url: '/signup',
      payload: {
        email: 'abc@example.com',
        password: '12',
      },
    });

    const body = JSON.parse(res.body);

    expect(res.statusCode).toBe(400);
    expect(body.message).toMatch(/password/);
  });

  it('POST "/signup" sends Bad Request for empty password', async () => {
    const res = await app.inject({
      method: 'post',
      url: '/signup',
      payload: {
        email: 'abc@example.com',
      },
    });

    const body = JSON.parse(res.body);

    expect(res.statusCode).toBe(400);
    expect(body.message).toMatch(/password/);
  });
});
