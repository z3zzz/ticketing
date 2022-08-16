import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { cookieOpt } from '@kwangtickets/common';
import { signService } from '../services';

interface PostSignup {
  Body: {
    email: string;
    password: string;
  };
  Reply: {
    id: number;
    email: string;
  };
}

export async function signupRoutes(
  app: FastifyInstance,
  options: FastifyPluginOptions
) {
  const opts = {
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
        201: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            email: { type: 'string', format: 'email' },
          },
        },
      },
    },
  };

  app.post<PostSignup>('/signup', opts, async (req, res) => {
    const { email, password } = req.body;

    const { id } = await signService.signup({ email, password });
    const token = await res.jwtSign({ id, email });

    res.setCookie('token', token, cookieOpt);
    res.code(201);

    return { id, email };
  });
}
