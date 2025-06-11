export type RequestMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'get'
  | 'post'
  | 'put'
  | 'delete';

export interface FetchOptions {
  method?: RequestMethod;
  body?: object | FormData;
  responseType?: 'json' | 'blob' | 'text';
  signal?: AbortSignal;
  headers?: HeadersInit;
}
