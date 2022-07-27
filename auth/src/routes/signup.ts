import {
  FastifyInstance,
  FastifyPluginOptions,
  RouteShorthandOptions,
} from 'fastify';
import { BadRequestError } from '../errors';

interface PostSignup {
  Body: {
    email: string;
    password: string;
  };
  Reply: {
    result: 'success' | 'fail';
  };
}

export async function signupRoutes(
  app: FastifyInstance,
  options: FastifyPluginOptions
) {
  const opts: { [keys: string]: RouteShorthandOptions } = {};

  opts['/signup'] = {
    schema: {
      body: {
        type: 'object',
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 4, maxLength: 20 },
        },
        required: ['email', 'password'],
        additionalProperties: false,
      },
      response: {
        200: {
          type: 'object',
          properties: {
            result: { enum: ['success', 'fail'] },
          },
        },
      },
    },
  };

  app.post<PostSignup>('/signup', opts['/signup'], async (req, res) => {
    return { result: 'success' };
  });
}
