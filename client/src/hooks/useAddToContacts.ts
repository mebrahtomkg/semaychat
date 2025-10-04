import { User } from '@/types';
import { post } from '@/api';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useRef } from 'react';
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

  const abortControllerRef = useRef<AbortController | null>(null);

  const { mutate } = useMutation<unknown, Error, number>({
    mutationFn: (userId) => {
      const ac = new AbortController();
      abortControllerRef.current = ac;
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

  const abortAddToContacts = useCallback(
    () => abortControllerRef.current?.abort(),
    [],
  );

  return { addToContacts, abortAddToContacts };
};

export default useAddToContacts;
