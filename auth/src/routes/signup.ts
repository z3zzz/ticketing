import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { signService } from '../services';

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
            result: { enum: ['success', 'fail'] },
          },
        },
      },
    },
  };

  app.post<PostSignup>('/signup', opts, async (req, res) => {
    const { email, password } = req.body;

    const { id } = await signService.signup({ email, password });
    const token = app.jwt.sign({ id, email });

    res.setCookie('jwt', token, { signed: true });
    res.code(201);
    return { result: 'success' };
  });
}
