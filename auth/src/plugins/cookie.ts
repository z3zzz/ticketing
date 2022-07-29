import fastifyPlugin from 'fastify-plugin';
import type { FastifyPluginAsync } from 'fastify';
import fastifyCookie from '@fastify/cookie';
import type { FastifyCookieOptions } from '@fastify/cookie';
import { COOKIE_KEY } from '../constants';

export const cookie = fastifyPlugin(async (fastify, options) => {
  fastify.register(
    fastifyCookie as unknown as FastifyPluginAsync<FastifyCookieOptions>,
    {
      secret: COOKIE_KEY,
    }
  );
});
