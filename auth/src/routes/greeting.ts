import {
  FastifyInstance,
  FastifyPluginOptions,
  RouteShorthandOptions,
} from 'fastify';

interface GetGreeting {
  Reply: {
    greeting: string;
  };
}

export async function greetingRoutes(
  app: FastifyInstance,
  options: FastifyPluginOptions
) {
  const opts: { [keys: string]: RouteShorthandOptions } = {};

  opts['/'] = {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            greeting: { type: 'string' },
          },
        },
      },
    },
  };

  app.get<GetGreeting>('/', opts['/'], async (req, res) => {
    // postgress connection check
    const { rows } = await app.pg.query('SELECT * from values LIMIT 1');

    return { greeting: 'Hi! It works!' };
  });
}
