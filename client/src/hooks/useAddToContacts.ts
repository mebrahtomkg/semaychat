import { User } from '@/types';
import { ApiError, post } from '@/api';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import useContactActions from './useContactActions';

interface AddToContactsOptions {
  onStart: () => void;
  onSuccess: () => void;
  onError: (err: Error) => void;
}

const useAddToContacts = (
  user: User,
  { onStart, onSuccess, onError }: AddToContactsOptions,
) => {
  const { addContact } = useContactActions();

  const { mutate } = useMutation<unknown, Error, number>({
    mutationFn: (userId) => {
      return post('/contacts', { userId });
    },
    retry: (failureCount: number, error: Error) => {
      return error instanceof ApiError && error.status
        ? false
        : failureCount < 2;
    },
    networkMode: 'always',
    onSuccess: () => {
      addContact(user);
    },
  });

  const addToContacts = useCallback(() => {
    onStart();
    mutate(user.id, { onSuccess, onError });
  }, [onStart, mutate, user.id, onSuccess, onError]);

  return addToContacts;
};

export default useAddToContacts;
