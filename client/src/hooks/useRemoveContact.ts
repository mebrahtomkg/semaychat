import { User } from '@/types';
import { ApiError, del } from '@/api';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import useContactActions from './useContactActions';

interface RemoveContactOptions {
  onStart: () => void;
  onSuccess: () => void;
  onError: (err: Error) => void;
}

const useRemoveContact = (
  user: User,
  { onStart, onSuccess, onError }: RemoveContactOptions,
) => {
  const { deleteContact } = useContactActions();

  const { mutate } = useMutation<unknown, Error, number>({
    mutationFn: (userId) => {
      return del(`/contacts/${userId}`);
    },
    retry: (failureCount: number, error: Error) => {
      return error instanceof ApiError && error.status
        ? false
        : failureCount < 2;
    },
    networkMode: 'always',
    onSuccess: () => {
      deleteContact(user.id);
    },
  });

  const removeContact = useCallback(() => {
    onStart();
    mutate(user.id, { onSuccess, onError });
  }, [onStart, mutate, user.id, onSuccess, onError]);

  return removeContact;
};

export default useRemoveContact;
