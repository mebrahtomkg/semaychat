import { User } from '@/types';
import { post } from '@/api';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import useContactActions from './useContactActions';
import useAbortController from './useAbortController';

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
  const { recreateAbortController, abort } = useAbortController();

  const { mutate } = useMutation<unknown, Error, number>({
    mutationFn: (userId) => {
      const ac = recreateAbortController();
      return post('/contacts', { userId }, { signal: ac.signal });
    },
    onSuccess: () => {
      addContact(user);
    },
  });

  const addToContacts = useCallback(() => {
    onStart();
    mutate(user.id, { onSuccess, onError });
  }, [onStart, mutate, user.id, onSuccess, onError]);

  return {
    addToContacts,
    abortAddToContacts: abort,
  };
};

export default useAddToContacts;
