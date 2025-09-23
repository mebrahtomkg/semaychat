import { put } from '@/api';
import { useAccountActions } from '@/hooks';
import { Account } from '@/types';
import { useCallback, useState } from 'react';

const useAccountUpdater = () => {
  const { setAccount } = useAccountActions();

  const [isUpdating, setIsUpdating] = useState(false);

  const updateAccount = useCallback(
    async (
      accountData: Partial<Account> & {
        password?: string;
        newPassword?: string;
      },
    ) => {
      setIsUpdating(true);
      try {
        const data = await put<Account>('/users/me', accountData);
        setIsUpdating(false);
        if (data) setAccount(data);
        return {
          success: true,
          message: 'Account update successfull!',
        };
      } catch (err) {
        return {
          success: false,
          message: (err as Error).message,
        };
      } finally {
        setIsUpdating(false);
      }
    },
    [setAccount],
  );

  return { updateAccount, isUpdating };
};

export default useAccountUpdater;
