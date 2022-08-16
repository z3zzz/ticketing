import { app } from '../app';
import { cleanupQuery } from '../models';
import { tester, prepareTest } from './config/setup';

describe('post-ticket test', () => {
  const TICKET = {
    title: 'test-ticket',
    price: '494410',
  };

  beforeAll(async () => {
    await prepareTest();
  });

  afterAll(async () => {
    await app.pg.query(cleanupQuery`title ${TICKET.title}`);
  });

  it('POST "/ticket" sends {title: test-ticket, id: some-number}', async () => {
    const res = await app.inject({
      method: 'post',
      url: '/ticket',
      payload: TICKET,
      cookies: { token: tester.cookie },
    });

    const body = JSON.parse(res.body);

    expect(res.statusCode).toBe(201);
    expect(body.title).toBe(TICKET.title);
    expect(body.id).toEqual(expect.any(Number));
  });

  it('POST "/ticket" sends Bad Request for title', async () => {
    const res = await app.inject({
      method: 'post',
      url: '/ticket',
      payload: {
        title: 'a',
        price: '1234',
      },
      cookies: { token: tester.cookie },
    });

    const body = JSON.parse(res.body);

    expect(res.statusCode).toBe(400);
    expect(body.message).toMatch(/title/);
  });

  it('POST "/ticket" sends Bad Request for price', async () => {
    const res = await app.inject({
      method: 'post',
      url: '/ticket',
      payload: {
        title: 'abc',
        price: '1111111111111111111111111',
      },
      cookies: { token: tester.cookie },
    });

    const body = JSON.parse(res.body);

    expect(res.statusCode).toBe(400);
    expect(body.message).toMatch(/price/);
  });

  it('POST "/ticket" sends Unauthorized 401 for cookie', async () => {
    const res = await app.inject({
      method: 'post',
      url: '/ticket',
      payload: {
        title: 'abc',
        price: '12345',
      },
    });

    expect(res.statusCode).toBe(401);
  });
});
