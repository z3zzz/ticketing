import Fastify from 'fastify';
import { greetingRoutes, PostTicketRoutes } from './routes';
import { cors, cookie, postgres, jwt } from '@kwangtickets/common';
import { NODE_ENV } from './constants';

// main
export const app = Fastify({
  logger: {
    transport:
      NODE_ENV !== 'production'
        ? {
            target: 'pino-pretty',
            options: { ignore: 'pid,hostname' },
          }
        : undefined,
  },
  disableRequestLogging: true,
});

// plugins
app.register(cors);
app.register(cookie);
app.register(postgres);
app.register(jwt);

// routes
app.register(greetingRoutes);
app.register(PostTicketRoutes);
