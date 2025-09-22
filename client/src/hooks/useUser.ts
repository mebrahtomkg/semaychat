import { useCallback, useMemo } from 'react';
import { calculateFullName, calculateNameInitials } from '@/utils';
import { useContactActions, useContacts } from '.';
import { User } from '@/types';
import useBlockedUserActions from './useBlockedUserActions';
import useBlockedUsers from './useBlockedUsers';
import { del, post } from '@/api';

const useUser = (user?: User) => {
  const blockedUsers = useBlockedUsers();
  const contacts = useContacts();

  const fullName = useMemo(
    () => calculateFullName(user?.firstName, user?.lastName),
    [user?.firstName, user?.lastName],
  );

  const nameInitials = useMemo(
    () => calculateNameInitials(user?.firstName, user?.lastName),
    [user?.firstName, user?.lastName],
  );

  const photoUrl = useMemo(
    () =>
      user?.profilePhoto?.id
        ? `/profile-photos/${user.profilePhoto.id}/file`
        : null,
    [user?.profilePhoto?.id],
  );

  const isBlocked = useMemo(
    () =>
      user
        ? blockedUsers.some((blockedUser) => blockedUser.id === user.id)
        : false,
    [blockedUsers, user],
  );

  const isContact = useMemo(
    () => (user ? contacts.some((contact) => contact.id === user.id) : false),
    [contacts, user],
  );

  const { addBlockedUser, deleteBlockedUser } = useBlockedUserActions();

  const blockUser = useCallback(async () => {
    if (!user || isBlocked) return;
    try {
      await post(`/blocked-users`, {
        userId: user.id,
      });
      addBlockedUser(user);
    } catch (err) {
      console.error((err as Error).message);
    }
  }, [addBlockedUser, isBlocked, user]);

  const unblockUser = useCallback(async () => {
    if (!user || !isBlocked) return;
    try {
      await del(`/blocked-users/${user.id}`);
      deleteBlockedUser(user.id);
    } catch (err) {
      console.error((err as Error).message);
    }
  }, [deleteBlockedUser, isBlocked, user]);

  const { addContact, deleteContact } = useContactActions();

  const addToContacts = useCallback(async () => {
    if (!user || isContact) return;

    try {
      await post('/contacts', {
        userId: user.id,
      });

      addContact(user);
    } catch (err) {
      console.error((err as Error).message);
    }
  }, [addContact, isContact, user]);

  const removeFromContacts = useCallback(async () => {
    if (!user || !isContact) return;
    try {
      await del(`/contacts/${user.id}`);
      deleteContact(user.id);
    } catch (err) {
      console.error((err as Error).message);
    }
  }, [deleteContact, isContact, user]);

  return {
    fullName,
    nameInitials,
    photoUrl,
    isBlocked,
    isContact,
    blockUser,
    unblockUser,
    addToContacts,
    removeFromContacts,
  };
};

export default useUser;
