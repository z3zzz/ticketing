import { FastifyInstance, FastifyPluginOptions } from 'fastify';

interface GetSignout {
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
      response: {
        200: {
          type: 'object',
          properties: {
            result: { enum: ['success', 'fail'] },
          },
        },
      },
    },
    onRequest: [app.authenticate],
  };

  app.get<GetSignout>('/signout', opts, (req, res) => {
    res.clearCookie('token');

    return { result: 'success' };
  });
}
