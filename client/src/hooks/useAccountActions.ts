import { Account } from '@/types';
import { useCallback } from 'react';
import queryClient from '@/queryClient';
import { ACCOUNT_QUERY_KEY } from './useAccountQuery';

const useAccountActions = () => {
  const setAccount = useCallback((account: Account) => {
    queryClient.setQueryData([ACCOUNT_QUERY_KEY], () => account);
  }, []);

  return {
    setAccount,
  };
};

export default useAccountActions;
