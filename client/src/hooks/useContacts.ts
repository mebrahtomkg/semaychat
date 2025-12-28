import { User } from '../types';
import { get } from '@/api';
import { QUERY_KEY_CONTACTS } from '@/constants';
import { useQuery } from '@tanstack/react-query';

const useContacts = () => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY_CONTACTS],
    queryFn: () => get<User[]>('/contacts'),
  });

  return data || [];
};

export default useContacts;
