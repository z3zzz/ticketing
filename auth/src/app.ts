import Fastify from 'fastify';
import {
  greetingRoutes,
  signinRoutes,
  signoutRoutes,
  signupRoutes,
} from './routes';
import { cors, cookie, postgres } from './plugins';

// main
export const app = Fastify({
  logger: true,
  disableRequestLogging: true,
});

// plugins
app.register(cors);
app.register(cookie);
app.register(postgres);

// routes
app.register(greetingRoutes);
app.register(signupRoutes);
app.register(signinRoutes);
app.register(signoutRoutes);
