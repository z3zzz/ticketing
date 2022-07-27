import { app } from './app';
import { PORT, POSTGRES_URL } from './constants';

app.listen({ port: PORT, host: '0.0.0.0' }, (err, url) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }

  app.pg.connect((err) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }

    app.log.info(`Postgres successfully connected. ${POSTGRES_URL}`);
  });
});
