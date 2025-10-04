import { User } from '@/types';
import useBlockedUserActions from './useBlockedUserActions';
import { ApiError, post } from '@/api';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

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

  const { mutate } = useMutation<unknown, Error, number>({
    mutationFn: (userId) => {
      return post('/blocked-users', { userId });
    },
    retry: (failureCount: number, error: Error) => {
      return error instanceof ApiError && error.status
        ? false
        : failureCount < 2;
    },
    networkMode: 'always',
    onSuccess: () => {
      addBlockedUser(user);
    },
  });

  const blockUser = useCallback(() => {
    onStart();
    mutate(user.id, { onSuccess, onError });
  }, [onStart, mutate, user.id, onSuccess, onError]);

  return blockUser;
};

export default useBlockUser;
