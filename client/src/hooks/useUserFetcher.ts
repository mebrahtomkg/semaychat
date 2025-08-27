import { User } from '../types';
import { useQuery } from '@tanstack/react-query';
import { ApiError, get } from '@/api';

const useUserFetcher = (userId: number) => {
  const { isError, data, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => get<User>(`/users/${userId}`),
    retry: (failureCount: number, error: Error) =>
      error instanceof ApiError && error.status ? false : failureCount < 2,
  });

  if (isError) {
    console.error(error);
  }

  return data;
};

export default useUserFetcher;
