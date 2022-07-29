import {
  FastifyInstance,
  FastifyPluginOptions,
  RouteShorthandOptions,
} from 'fastify';

interface User {
  id: string;
  email: string;
}

interface GetCurrentUser {
  Reply: User;
}

export async function currentUserRoutes(
  app: FastifyInstance,
  options: FastifyPluginOptions
) {
  const opts: RouteShorthandOptions = {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string', format: 'email' },
          },
        },
      },
    },
    onRequest: [app.authenticate],
  };

  app.get<GetCurrentUser>('/currentUser', opts, async (req, res) => {
    const currentUser = req.user as User;

    return currentUser;
  });
}
