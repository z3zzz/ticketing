import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { signService } from '../services';

interface PostSignout {
  Body: {
    email: string;
    password: string;
  };
  Reply: {
    result: 'success' | 'fail';
  };
}

export async function signoutRoutes(
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

  app.post<PostSignout>('/signout', opts, async (req, res) => {
    const { email, password } = req.body;

    await signService.signout({ email, password });
    app.log.info(`user-signout: ${email}`);

    res.clearCookie('jwt');

    return { result: 'success' };
  });
}
