import { Account } from '@/types';
import { put } from '@/api';
import { useMutation } from '@tanstack/react-query';
import queryClient from '@/queryClient';
import { QUERY_KEY_ACCOUNT } from '@/constants';
import useAbortController from './useAbortController';
import { useCallback } from 'react';

type AccountUpdateData = Partial<
  Omit<Account, 'id' | 'email' | 'profilePhoto'>
> & {
  password?: string;
  newPassword?: string;
};

const useUpdateAccount = () => {
  const { prepareAbortController, getSignal, abort } = useAbortController();

  const { mutate, ...rest } = useMutation({
    mutationFn: (accountData: AccountUpdateData) => {
      prepareAbortController();
      return put<Account>('/users/me', accountData, { signal: getSignal() });
    },
    onMutate: async (accountData) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY_ACCOUNT] });

      const prevAccount = queryClient.getQueryData([QUERY_KEY_ACCOUNT]);

      queryClient.setQueryData([QUERY_KEY_ACCOUNT], (oldAccount) => {
        if (!oldAccount) return undefined;
        const safeAccountData = {
          ...accountData,
          password: undefined,
          newPassword: undefined,
        };
        return { ...oldAccount, ...safeAccountData };
      });

      return { prevAccount };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData([QUERY_KEY_ACCOUNT], context?.prevAccount);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_ACCOUNT] });
    },
  });

  const updateAccount = useCallback(
    (accountData: AccountUpdateData) => mutate(accountData),
    [mutate],
  );

  return {
    updateAccount,
    abort,
    ...rest,
  };
};

export default useUpdateAccount;
