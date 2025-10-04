import { User } from '@/types';
import useBlockedUserActions from './useBlockedUserActions';
import { ApiError, del } from '@/api';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

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

  const { mutate } = useMutation<unknown, Error, number>({
    mutationFn: (userId) => {
      return del(`/blocked-users/${userId}`);
    },
    retry: (failureCount: number, error: Error) => {
      return error instanceof ApiError && error.status
        ? false
        : failureCount < 2;
    },
    networkMode: 'always',
    onSuccess: () => {
      deleteBlockedUser(user.id);
    },
  });

  const unblockUser = useCallback(() => {
    onStart();
    mutate(user.id, { onSuccess, onError });
  }, [onStart, mutate, user.id, onSuccess, onError]);

  return unblockUser;
};

export default useUnblockUser;
