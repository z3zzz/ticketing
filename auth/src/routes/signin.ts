import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { cookieOpt } from '../plugins/cookie';
import { signService } from '../services';

interface PostSignin {
  Body: {
    email: string;
    password: string;
  };
  Reply: {
    id: number;
    email: string;
  };
}

export async function signinRoutes(
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
        200: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            email: { type: 'string', format: 'email' },
          },
        },
      },
    },
  };

  app.post<PostSignin>('/signin', opts, async (req, res) => {
    const { email, password } = req.body;

    const { id } = await signService.signin({ email, password });
    app.log.info(`user-signin: ${email}`);

    const token = await res.jwtSign({ id, email });
    res.setCookie('token', token, cookieOpt);

    return { id, email };
  });
}
