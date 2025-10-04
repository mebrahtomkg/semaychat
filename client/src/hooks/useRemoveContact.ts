import { User } from '@/types';
import { del } from '@/api';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import useContactActions from './useContactActions';
import useAbortController from './useAbortController';

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
  const { recreateAbortController, abort } = useAbortController();

  const { mutate } = useMutation<unknown, Error, number>({
    mutationFn: (userId) => {
      const ac = recreateAbortController();
      return del(`/contacts/${userId}`, { signal: ac.signal });
    },
    onSuccess: () => {
      deleteContact(user.id);
    },
  });

  const removeContact = useCallback(() => {
    onStart();
    mutate(user.id, { onSuccess, onError });
  }, [onStart, mutate, user.id, onSuccess, onError]);

  return {
    removeContact,
    abortRemoveContact: abort,
  };
};

export default useRemoveContact;
