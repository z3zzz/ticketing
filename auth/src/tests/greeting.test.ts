import { app } from '../app';

describe('greeting test', () => {
  it('GET "/" sends greeting', async () => {
    const res = await app.inject({
      method: 'get',
      url: '/',
    });

    const body = JSON.parse(res.body);

    expect(res.statusCode).toBe(200);
    expect(body.greeting).toMatch(/Hi! it works!/i);
  });
});
