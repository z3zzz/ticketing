import fastifyPlugin from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
import { JWT_SECRET_KEY } from '../constants';
import { FastifyRequest } from 'fastify';
import { BadRequestError } from '../errors';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: () => Promise<void>;
  }
}

export const jwt = fastifyPlugin(async (fastify, options) => {
  fastify.register(fastifyJwt, {
    secret: JWT_SECRET_KEY!,
    cookie: {
      cookieName: 'token',
      signed: true,
    },
  });

  fastify.decorate('authenticate', async function (req: FastifyRequest) {
    try {
      await req.jwtVerify();
    } catch {
      throw new BadRequestError('getUser: Invalid crendial token');
    }
  });
});
