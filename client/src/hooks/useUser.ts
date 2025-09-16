import { useCallback, useMemo } from 'react';
import { calculateFullName, calculateNameInitials } from '@/utils';
import useAPI from './useAPI';
import { useContactActions, useContacts } from '.';
import { User } from '@/types';
import useBlockedUserActions from './useBlockedUserActions';
import useBlockedUsers from './useBlockedUsers';

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

  const { post, del } = useAPI();

  const { addBlockedUser, deleteBlockedUser } = useBlockedUserActions();

  const blockUser = useCallback(async () => {
    if (!user || isBlocked) return;
    const { success, message } = await post(`/blocked-users`, {
      userId: user.id,
    });
    if (success) {
      addBlockedUser(user);
    } else {
      console.error(message);
    }
  }, [addBlockedUser, isBlocked, post, user]);

  const unblockUser = useCallback(async () => {
    if (!user || !isBlocked) return;
    const { success, message } = await del(`/blocked-users/${user.id}`);
    if (success) {
      deleteBlockedUser(user.id);
    } else {
      console.error(message);
    }
  }, [del, deleteBlockedUser, isBlocked, user]);

  const { addContact, deleteContact } = useContactActions();

  const addToContacts = useCallback(async () => {
    if (!user || isContact) return;
    const { success, message } = await post('/contacts', {
      userId: user.id,
    });
    if (success) {
      addContact(user);
    } else {
      console.error(message);
    }
  }, [addContact, isContact, post, user]);

  const removeFromContacts = useCallback(async () => {
    if (!user || !isContact) return;
    const { success, message } = await del(`/contacts/${user.id}`);
    if (success) {
      deleteContact(user.id);
    } else {
      console.error(message);
    }
  }, [del, deleteContact, isContact, user]);

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
