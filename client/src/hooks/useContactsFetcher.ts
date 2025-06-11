import { useEffect } from 'react';
import { useAppDispatch } from '.';
import { User } from '../types';
import { contactsFetched } from '../contactsSlice';
import { manyUsersAdded } from '../usersSlice';
import { ApiError, get } from '@/api';
import { useQuery } from '@tanstack/react-query';

const useContactsFetcher = () => {
  const dispatch = useAppDispatch();

  const { isError, data, error } = useQuery({
    queryKey: ['/contacts'],
    queryFn: () => get<User[]>('/contacts'),
    retry: (failureCount: number, error: Error) =>
      error instanceof ApiError && error.status ? false : failureCount < 2
  });

  useEffect(() => {
    if (data) {
      const contacts = data.map((user) => user.id);
      dispatch(contactsFetched(contacts));
      dispatch(manyUsersAdded(data));
    }
  }, [data, dispatch]);

  if (isError) {
    console.error(error);
  }
};

export default useContactsFetcher;
