import { User } from '@/types';
import useBlockedUserActions from './useBlockedUserActions';
import { ApiError, post } from '@/api';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import useAbortController from './useAbortController';

interface BlockUserOptions {
  onStart: () => void;
  onSuccess: () => void;
  onError: (err: Error) => void;
}

const useBlockUser = (
  user: User,
  { onStart, onSuccess, onError }: BlockUserOptions,
) => {
  const { addBlockedUser } = useBlockedUserActions();
  const { prepareAbortController, getSignal, abort } = useAbortController();

  const { mutate } = useMutation<unknown, Error, number>({
    mutationFn: (userId) => {
      return post('/blocked-users', { userId }, { signal: getSignal() });
    },
    onSuccess: () => {
      addBlockedUser(user);
    },
  });

  const blockUser = useCallback(() => {
    prepareAbortController();
    onStart();
    mutate(user.id, { onSuccess, onError });
  }, [prepareAbortController, onStart, mutate, user.id, onSuccess, onError]);

  return {
    blockUser,
    abortBlockUser: abort,
  };
};

export default useBlockUser;
