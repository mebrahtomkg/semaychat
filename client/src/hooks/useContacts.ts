import { User } from '../types';
import { ApiError, get } from '@/api';
import { useQuery } from '@tanstack/react-query';

export const CONTACTS_QUERY_KEY = 'contacts';

const useContacts = () => {
  const { isError, data, error } = useQuery({
    queryKey: [CONTACTS_QUERY_KEY],
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
