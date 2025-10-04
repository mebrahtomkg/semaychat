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
  const { prepareAbortController, getSignal, abort } = useAbortController();

  const { mutate } = useMutation<unknown, Error, number>({
    mutationFn: (userId) => {
      return del(`/contacts/${userId}`, { signal: getSignal() });
    },
    onSuccess: () => {
      deleteContact(user.id);
    },
  });

  const removeContact = useCallback(() => {
    onStart();
    prepareAbortController();
    mutate(user.id, { onSuccess, onError });
  }, [onStart, prepareAbortController, mutate, user.id, onSuccess, onError]);

  return {
    removeContact,
    abortRemoveContact: abort,
  };
};

export default useRemoveContact;
