import Fastify from 'fastify';
import cors from '@fastify/cors';
import { greetingRoutes, signupRoutes } from './routes';
import { postgres } from './plugins';

export const app = Fastify({
  logger: true,
  disableRequestLogging: true,
});

app.register(cors, {
  origin: [/localhost/, /postman/],
});

app.register(postgres);

app.register(greetingRoutes);
app.register(signupRoutes);
