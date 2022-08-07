import { NextApiRequest, NextApiResponse } from 'next';
import { sendRequest, ErrorResponse } from '../../utils';
import { AUTH_API_HOST } from '../../utils/constants';

type HostSelector = 'auth';

const hostMatcher: Record<HostSelector, string> = {
  auth: AUTH_API_HOST,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const paths = req.query.path as string[];
  const hostSelector = paths[0] as HostSelector;

  const host = hostMatcher[hostSelector];
  const realPath = paths.slice(1).join('/');

  const url = `http://${host}/${realPath}`;
  const method = req.method as 'GET' | 'POST';
  const payload = req.body;

  const { data, isError } = await sendRequest({ path: url, method, payload });

  if (isError) {
    const err = data as ErrorResponse;

    return res.status(err.statusCode).json(err);
  }

  res.status(200).json(data);
}
