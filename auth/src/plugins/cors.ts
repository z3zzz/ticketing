import fastifyPlugin from 'fastify-plugin';
import fastifyCors from '@fastify/cors';

export const cors = fastifyPlugin(async (fastify, options) => {
  fastify.register(fastifyCors, {
    origin: [/localhost/, /postman/],
  });
});
