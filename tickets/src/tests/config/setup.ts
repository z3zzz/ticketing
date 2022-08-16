import './environment-variables';
import { app } from '../../app';
import { initialQuery } from '../../models';

// default user info for auth
export const tester = {
  email: 'signin@example.com',
  cookie:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwLCJlbWFpbCI6InNpZ25pbkBleGFtcGxlLmNvbSIsImlhdCI6MTY2MDYzODg1N30.oqZn8yAe0Nx7Q4tD8p5E66o13w1pH89PHkCSQf3zkho.2xZgvMf1uw3z6N28WoffzkFdbAe2hTODTexiGrpsH+Y',
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
