import Fastify from 'fastify';
import {
  currentUserRoutes,
  greetingRoutes,
  signinRoutes,
  signoutRoutes,
  signupRoutes,
} from './routes';
import { cors, cookie, postgres, jwt } from './plugins';
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
app.register(signupRoutes);
app.register(signinRoutes);
app.register(signoutRoutes);
app.register(currentUserRoutes);
