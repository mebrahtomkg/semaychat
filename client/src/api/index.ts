import apiFetch from './apiFetch';
import { FetchOptions } from './types';

export { apiFetch };

export { default as ApiError } from './ApiError';

export const get = async <D>(
  endpoint: string,
  options?: FetchOptions
): Promise<D> => {
  return await apiFetch(endpoint, { ...options, method: 'GET' });
};

export const post = async <D>(
  endpoint: string,
  body: object | FormData,
  options?: FetchOptions
): Promise<D> => {
  return await apiFetch(endpoint, { ...options, body, method: 'POST' });
};

export const put = async <D>(
  endpoint: string,
  body: object | FormData,
  options?: FetchOptions
): Promise<D> => {
  return await apiFetch(endpoint, { ...options, body, method: 'PUT' });
};

export const del = async <D>(
  endpoint: string,
  options?: FetchOptions
): Promise<D> => {
  return await apiFetch(endpoint, { ...options, method: 'DELETE' });
};
