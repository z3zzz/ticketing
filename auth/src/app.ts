import Fastify from 'fastify';
import {
  currentUserRoutes,
  greetingRoutes,
  signinRoutes,
  signoutRoutes,
  signupRoutes,
} from './routes';
import { cors, cookie, postgres, jwt } from './plugins';

// main
export const app = Fastify({
  logger: true,
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
