import { NODE_ENV } from './constants';
import { getUrl } from './get-url';

type Data = any;

interface SendRequestArgs {
  method: 'GET' | 'POST';
  path: string;
  payload?: Data;
}

export interface ErrorResponse {
  statusCode: number;
  error: string;
  message: string;
}

export const sendRequest = async (args: SendRequestArgs) => {
  const { method, path, payload } = args;
  const url = getUrl(path);

  const credentials = NODE_ENV === 'production' ? 'same-origin' : 'include';
  const headers =
    method === 'POST' ? { 'Content-Type': 'application/json' } : undefined;
  const body = method === 'POST' ? JSON.stringify(payload) : undefined;

  console.log({ method, credentials, url, payload });

  let data: Data | null = null;
  let isError: boolean = false;

  await fetch(url, {
    method,
    credentials,
    headers,
    body,
  })
    .then((res) => {
      if (!res.ok) {
        isError = true;
      }

      return res.json();
    })
    .then((resultData) => {
      data = resultData;
    });

  return { data, isError };
};
