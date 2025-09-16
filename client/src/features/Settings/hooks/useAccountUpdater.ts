import { useAccountActions, useAPI } from '@/hooks';
import { Account } from '@/types';
import { useCallback, useState } from 'react';

const useAccountUpdater = () => {
  const { setAccount } = useAccountActions();

  const [isUpdating, setIsUpdating] = useState(false);

  const { put } = useAPI();

  const updateAccount = useCallback(
    async (accountData: Partial<Account>) => {
      setIsUpdating(true);

      const { success, data, message } = await put<Account>(
        '/users/me',
        accountData,
      );

      if (success) setAccount(data);

      setIsUpdating(false);

      return { success, message };
    },
    [setAccount, put],
  );

  return { updateAccount, isUpdating };
};

export default useAccountUpdater;
