import { User } from '@/types';
import useBlockedUserActions from './useBlockedUserActions';
import { del } from '@/api';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import useAbortController from './useAbortController';

interface UnblockUserOptions {
  onStart: () => void;
  onSuccess: () => void;
  onError: (err: Error) => void;
}

const useUnblockUser = (
  user: User,
  { onStart, onSuccess, onError }: UnblockUserOptions,
) => {
  const { deleteBlockedUser } = useBlockedUserActions();
  const { prepareAbortController, getSignal, abort } = useAbortController();

  const { mutate } = useMutation<unknown, Error, number>({
    mutationFn: (userId) => {
      return del(`/blocked-users/${userId}`, { signal: getSignal() });
    },
    onSuccess: () => {
      deleteBlockedUser(user.id);
    },
  });

  const unblockUser = useCallback(() => {
    prepareAbortController();
    onStart();
    mutate(user.id, { onSuccess, onError });
  }, [prepareAbortController, onStart, mutate, user.id, onSuccess, onError]);

  return {
    unblockUser,
    abortUnblockUser: abort,
  };
};

export default useUnblockUser;
