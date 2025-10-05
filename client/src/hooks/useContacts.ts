import { User } from '../types';
import { ApiError, get } from '@/api';
import { QUERY_KEY_CONTACTS } from '@/constants';
import { useQuery } from '@tanstack/react-query';

const useContacts = () => {
  const { isError, data, error } = useQuery({
    queryKey: [QUERY_KEY_CONTACTS],
    queryFn: () => get<User[]>('/contacts'),
    retry: (failureCount: number, error: Error) =>
      error instanceof ApiError && error.status ? false : failureCount < 2,
  });

  if (isError) {
    console.error(error);
  }

  return data || [];
};

export default useContacts;
