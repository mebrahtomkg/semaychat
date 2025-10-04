import { API_BASE_URL } from '@/constants';
import { FetchOptions } from './types';
import ApiError from './ApiError';

const apiFetch = async <Result>(
  endpoint: string,
  options?: FetchOptions,
): Promise<Result> => {
  const {
    method = 'GET',
    responseType = 'json',
    headers = {},
    body,
    signal,
  } = options || {};

  if (!['GET', 'POST', 'PUT', 'DELETE'].includes(method.toUpperCase())) {
    throw new Error(`Invalid or unsupported method: ${method}`);
  }

  if (!['json', 'blob', 'text'].includes(responseType)) {
    throw new Error(`Invalid response type: ${responseType}`);
  }

  const init: RequestInit = {
    method: method.toUpperCase(),
    credentials: 'include',
    headers,
  };

  if (body && ['POST', 'PUT'].includes(method.toUpperCase())) {
    init.body = body instanceof FormData ? body : JSON.stringify(body);
    if (!(body instanceof FormData)) {
      init.headers = { ...headers, 'Content-Type': 'application/json' };
    }
  }

  if (signal) {
    init.signal = signal;
  }

  const url =
    endpoint.startsWith('http://') || endpoint.startsWith('https://')
      ? endpoint
      : `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, init);

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new ApiError(errorResponse?.message, response.status);
  }

  switch (responseType) {
    case 'blob':
      return (await response.blob()) as Result;

    case 'text':
      return (await response.text()) as Result;

    default: {
      const jsonResponse = await response.json();

      // Server is expected to send the actual data in `data` property of the json response.
      return jsonResponse.data;
    }
  }
};

export default apiFetch;
