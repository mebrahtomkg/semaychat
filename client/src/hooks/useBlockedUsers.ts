import { User } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { ApiError, get } from '@/api';

export const BLOCKED_USERS_QUERY_KEY = 'blockedUsers';

const useBlockedUsers = () => {
  const { isError, data, error } = useQuery({
    queryKey: [BLOCKED_USERS_QUERY_KEY],
    queryFn: () => get<User[]>('/blocked-users'),
    retry: (failureCount: number, error: Error) =>
      error instanceof ApiError && error.status ? false : failureCount < 2,
  });

  if (isError) {
    console.error(error);
  }

  return data || [];
};

export default useBlockedUsers;
