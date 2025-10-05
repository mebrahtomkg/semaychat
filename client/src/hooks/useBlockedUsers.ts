import { User } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { ApiError, get } from '@/api';
import { QUERY_KEY_BLOCKED_USERS } from '@/constants';

const useBlockedUsers = () => {
  const { isError, data, error } = useQuery({
    queryKey: [QUERY_KEY_BLOCKED_USERS],
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
