import { QueryClient } from '@tanstack/react-query';
import { ApiError } from './api';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Number.POSITIVE_INFINITY,
      gcTime: Number.POSITIVE_INFINITY,
    },
    mutations: {
      retry: (failureCount: number, error: Error) => {
        // No retry if the request was aborted
        if (error.name === 'AbortError') return false;

        // No retry if the error is api error such as 400, 401, ..500
        if (error instanceof ApiError && error.status) {
          return false;
        }

        return failureCount < 2;
      },
      networkMode: 'always',
    },
  },
});

export default queryClient;
