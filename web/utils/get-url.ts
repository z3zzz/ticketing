import { AUTH_API_HOST, NODE_ENV } from './constants';

type HostSelector = 'auth';

const hostMatcher: Record<HostSelector, string> = {
  auth: AUTH_API_HOST,
};

export const getUrl = (path: string) => {
  if (NODE_ENV === 'production') {
    return path;
  }

  // path: /api/auth/signup
  // after split: ['', 'api', 'auth', 'signup']

  const paths = path.split('/');
  const hostSelector = paths[2] as HostSelector;

  const host = hostMatcher[hostSelector];
  const realPath = paths.slice(3).join('/');

  const url = `http://${host}/${realPath}`;

  return url;
};
