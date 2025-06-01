import { useCallback, useState } from 'react';
import { Account } from '../../../types';
import { useAPI, useAppDispatch } from '../../../hooks';
import { accountUpdated } from '../slices/accountSlice';

const useAccountUpdater = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  const { put } = useAPI();

  const dispatch = useAppDispatch();

  const updateAccount = useCallback(async (accountData: Partial<Account>) => {
    setIsUpdating(true);

    const { success, data, message } = await put<Account>(
      '/users/me',
      accountData
    );

    if (success) dispatch(accountUpdated(data));

    setIsUpdating(false);
    
    return { success, message };
  }, [dispatch, put]);

  return { updateAccount, isUpdating };
};

export default useAccountUpdater;
