import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { userAdded } from '../usersSlice';
import { User } from '../types';
import { useQuery } from '@tanstack/react-query';
import { ApiError, get } from '@/api';

const useUserFetcher = (userId: number) => {
  const users = useAppSelector((state) => state.users);

  const user = users.find((user) => user.id === userId);

  const dispatch = useAppDispatch();

  const { isError, data, error } = useQuery({
    queryKey: [`/users/${userId}`],
    queryFn: () => get<User>(`/users/${userId}`),
    retry: (failureCount: number, error: Error) =>
      error instanceof ApiError && error.status ? false : failureCount < 2,
  });

  useEffect(() => {
    if (data) dispatch(userAdded(data));
  }, [data, dispatch]);

  if (isError) {
    console.error(error);
  }

  return user;
};

export default useUserFetcher;
