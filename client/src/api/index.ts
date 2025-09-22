import apiFetch from './apiFetch';
import { FetchOptions } from './types';

export { apiFetch };

export { default as ApiError } from './ApiError';

export const get = async <Result>(
  endpoint: string,
  options?: FetchOptions,
): Promise<Result> => {
  return await apiFetch(endpoint, { ...options, method: 'GET' });
};

export const post = async <Result>(
  endpoint: string,
  body: object | FormData,
  options?: FetchOptions,
): Promise<Result> => {
  return await apiFetch(endpoint, { ...options, body, method: 'POST' });
};

export const put = async <Result>(
  endpoint: string,
  body: object | FormData,
  options?: FetchOptions,
): Promise<Result> => {
  return await apiFetch(endpoint, { ...options, body, method: 'PUT' });
};

export const del = async <Result>(
  endpoint: string,
  options?: FetchOptions,
): Promise<Result> => {
  return await apiFetch(endpoint, { ...options, method: 'DELETE' });
};
