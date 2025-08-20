import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks';
import { User } from '@/types';
import { manyUsersAdded } from '@/usersSlice';
import { useQuery } from '@tanstack/react-query';
import { ApiError, get } from '@/api';

const useSuggestionsFetcher = () => {
  const dispatch = useAppDispatch();

  const { isError, data, error } = useQuery({
    queryKey: ['/users/suggestions'],
    queryFn: () => get<User[]>('/users/suggestions'),
    retry: (failureCount: number, error: Error) =>
      error instanceof ApiError && error.status ? false : failureCount < 2,
  });

  useEffect(() => {
    if (data) dispatch(manyUsersAdded(data));
  }, [data, dispatch]);

  if (isError) {
    console.error(error);
  }
};

export default useSuggestionsFetcher;
