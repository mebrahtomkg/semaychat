/* global HeadersInit */

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import smartFetch, { Method, ResponseResult } from './smartFetch';

interface RequestOptions {
  method?: Method;
  body?: object | FormData;
  responseType?: 'json' | 'blob' | 'text';
  headers?: HeadersInit;
  autoCancel?: boolean;
}

const API_BASE_URL = 'https://semaychat-production.up.railway.app/api';

const useAPI = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  const abortRequest = useCallback(() => {
    if (abortControllerRef.current) abortControllerRef.current.abort();
    abortControllerRef.current = null;
  }, []);

  const request = useCallback(
    async <D>(
      endpoint: string,
      options?: RequestOptions
    ): Promise<ResponseResult<D>> => {
      const {
        method,
        body,
        headers,
        responseType,
        autoCancel
      }: RequestOptions = {
        method: 'GET',
        headers: {},
        responseType: 'json',
        autoCancel: true,
        ...(options || {})
      };

      try {
        if (autoCancel) abortRequest();
        setIsLoading(true);

        abortControllerRef.current = new AbortController();

        const data = await smartFetch<D>(`${API_BASE_URL}${endpoint}`, {
          method,
          body,
          headers,
          responseType,
          signal: abortControllerRef.current.signal
        });

        return data;
      } catch (err) {
        console.error(err);
        return { success: false, data: null as D };
      } finally {
        abortControllerRef.current = null;
        setIsLoading(false);
      }
    },
    [abortRequest]
  );

  useEffect(() => abortRequest, [abortRequest]);

  const requestMethods = useMemo(
    () => ({
      async get<D>(
        endpoint: string,
        options?: RequestOptions
      ): Promise<ResponseResult<D>> {
        return await request(endpoint, { ...options, method: 'GET' });
      },

      async post<D>(
        endpoint: string,
        body: object | FormData,
        options?: RequestOptions
      ): Promise<ResponseResult<D>> {
        return await request(endpoint, { ...options, body, method: 'POST' });
      },

      async put<D>(
        endpoint: string,
        body: object | FormData,
        options?: RequestOptions
      ): Promise<ResponseResult<D>> {
        return await request(endpoint, { ...options, body, method: 'PUT' });
      },

      async del<D>(
        endpoint: string,
        options?: RequestOptions
      ): Promise<ResponseResult<D>> {
        return await request(endpoint, { ...options, method: 'DELETE' });
      }
    }),
    [request]
  );

  return { isLoading, request, ...requestMethods };
};

export default useAPI;
