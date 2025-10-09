import { Account } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { ApiError, get } from '@/api';
import { QUERY_KEY_ACCOUNT } from '@/constants';

const useAccountQuery = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: [QUERY_KEY_ACCOUNT],
    queryFn: () => get<Account>(`/users/me`),
    retry: (failureCount: number, error: Error) =>
      error instanceof ApiError && error.status === 401
        ? false
        : failureCount < 2,
  });

  if (isError) {
    console.error(
      error.message || 'Unkown error happend while fetching account!',
    );
  }

  return { isPending, account: data };
};

export default useAccountQuery;
