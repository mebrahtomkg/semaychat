import { useCallback } from 'react';
import { useContactActions } from '.';
import { User } from '@/types';
import useBlockedUserActions from './useBlockedUserActions';
import { del, post } from '@/api';

const useUserActions = (user: User) => {
  const { addBlockedUser, deleteBlockedUser } = useBlockedUserActions();
  const { addContact, deleteContact } = useContactActions();

  const blockUser = useCallback(async () => {
    try {
      await post(`/blocked-users`, {
        userId: user.id,
      });
      addBlockedUser(user);
    } catch (err) {
      console.error((err as Error).message);
    }
  }, [addBlockedUser, user]);

  const unblockUser = useCallback(async () => {
    try {
      await del(`/blocked-users/${user.id}`);
      deleteBlockedUser(user.id);
    } catch (err) {
      console.error((err as Error).message);
    }
  }, [deleteBlockedUser, user]);

  const addToContacts = useCallback(async () => {
    try {
      await post('/contacts', {
        userId: user.id,
      });

      addContact(user);
    } catch (err) {
      console.error((err as Error).message);
    }
  }, [addContact, user]);

  const removeFromContacts = useCallback(async () => {
    try {
      await del(`/contacts/${user.id}`);
      deleteContact(user.id);
    } catch (err) {
      console.error((err as Error).message);
    }
  }, [deleteContact, user]);

  return {
    blockUser,
    unblockUser,
    addToContacts,
    removeFromContacts,
  };
};

export default useUserActions;
