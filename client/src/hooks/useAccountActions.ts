import { Account } from '@/types';
import { useCallback } from 'react';
import queryClient from '@/queryClient';
import { QUERY_KEY_ACCOUNT } from '@/constants';

const useAccountActions = () => {
  const setAccount = useCallback((account: Account) => {
    queryClient.setQueryData([QUERY_KEY_ACCOUNT], () => account);
  }, []);

  return {
    setAccount,
  };
};

export default useAccountActions;
