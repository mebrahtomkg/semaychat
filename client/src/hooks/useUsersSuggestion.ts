import { User } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { ApiError, get } from '@/api';

const useUsersSuggestion = () => {
  const { isError, data, error } = useQuery({
    queryKey: ['/users/suggestions'],
    queryFn: () => get<User[]>('/users/suggestions'),
    retry: (failureCount: number, error: Error) =>
      error instanceof ApiError && error.status ? false : failureCount < 2,
  });

  if (isError) {
    console.error(error);
  }

  return data || [];
};

export default useUsersSuggestion;
