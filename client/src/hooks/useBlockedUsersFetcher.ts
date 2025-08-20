import { useEffect } from 'react';
import { useAppDispatch } from '.';
import { User } from '@/types';
import { manyUsersAdded } from '@/usersSlice';
import { blockedUsersFetched } from '@/blockedUsersSlice';
import { useQuery } from '@tanstack/react-query';
import { ApiError, get } from '@/api';

const useBlockedUsersFetcher = () => {
  const dispatch = useAppDispatch();

  const { isError, data, error } = useQuery({
    queryKey: ['/blocked-users'],
    queryFn: () => get<User[]>('/blocked-users'),
    retry: (failureCount: number, error: Error) =>
      error instanceof ApiError && error.status ? false : failureCount < 2,
  });

  useEffect(() => {
    if (data) {
      const blockedUsers = data.map((user) => user.id);
      dispatch(blockedUsersFetched(blockedUsers));
      dispatch(manyUsersAdded(data));
    }
  }, [data, dispatch]);

  if (isError) {
    console.error(error);
  }
};

export default useBlockedUsersFetcher;
