/* global HeadersInit, RequestInit */

export type Method =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'get'
  | 'post'
  | 'put'
  | 'delete';

interface FetchOptions {
  method?: Method;
  body?: object | FormData;
  responseType?: 'json' | 'blob' | 'text';
  signal?: AbortSignal;
  headers?: HeadersInit;
}

export interface ResponseResult<D> {
  success: boolean;
  data: D;
  message?: string;
  status?: number;
}

const smartFetch = async <D>(
  url: string,
  options?: FetchOptions,
): Promise<ResponseResult<D>> => {
  const { method, body, responseType, signal, headers }: FetchOptions = {
    method: 'GET',
    responseType: 'json',
    headers: {},
    ...(options || {}),
  };

  if (!['GET', 'POST', 'PUT', 'DELETE'].includes(method.toUpperCase()))
    throw new Error(`Invalid or unsupported method: ${method}`);

  if (!['json', 'blob', 'text'].includes(responseType))
    throw new Error(`Invalid responseType: ${responseType}`);

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

  try {
    const response = await fetch(url, init);

    const status = response.status;

    // Server is not expected to send blob or text responses with error status codes.
    if (!response.ok || responseType === 'json') {
      const jsonResponse = await response.json();
      return { ...jsonResponse, success: response.ok, status };
    }

    // Wrapping blob response into standard API response object.
    if (responseType === 'blob') {
      const blob = await response.blob();
      return { success: true, data: blob as D, status };
    }

    // Wrapping text response into standard API response object.
    if (responseType === 'text') {
      const text = await response.text();
      return { success: true, data: text as D, status };
    }

    throw new Error(`Unhandled responseType: ${responseType}`);
  } catch (err) {
    //console.error(err);
    return {
      success: false,
      data: undefined as D,
      message: err.message || 'Something went wrong',
    };
  }
};

export default smartFetch;
