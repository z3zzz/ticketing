import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { jwtService, signService } from '../services';

interface PostSignin {
  Body: {
    email: string;
    password: string;
  };
  Reply: {
    result: 'success' | 'fail';
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
            result: { enum: ['success', 'fail'] },
          },
        },
      },
    },
  };

  app.post<PostSignin>('/signin', opts, async (req, res) => {
    const { email, password } = req.body;

    const { id } = await signService.signin({ email, password });
    app.log.info(`user-signin: ${email}`);

    const token = jwtService.createToken({ id, email });
    res.setCookie('jwt', token, { signed: true });

    return { result: 'success' };
  });
}
