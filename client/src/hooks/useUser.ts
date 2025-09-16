import { useCallback, useMemo } from 'react';
import { calculateFullName, calculateNameInitials } from '@/utils';
import useAPI from './useAPI';
import {
  useAppDispatch,
  useAppSelector,
  useContactActions,
  useContacts,
} from '.';
import { blockedUserAdded, blockedUserDeleted } from '../blockedUsersSlice';
import { User } from '@/types';

const useUser = (user?: User) => {
  const blockedUsers = useAppSelector((state) => state.blockedUsers);
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
    () => (user ? blockedUsers.includes(user.id) : false),
    [blockedUsers, user],
  );

  const isContact = useMemo(
    () => (user ? contacts.some((contact) => contact.id === user.id) : false),
    [contacts, user],
  );

  const { post, del } = useAPI();
  const dispatch = useAppDispatch();

  const blockUser = useCallback(async () => {
    if (!user || isBlocked) return;
    const { success, message } = await post(`/blocked-users`, {
      userId: user.id,
    });
    if (success) {
      dispatch(blockedUserAdded(user.id));
    } else {
      console.error(message);
    }
  }, [dispatch, isBlocked, post, user]);

  const unblockUser = useCallback(async () => {
    if (!user || !isBlocked) return;
    const { success, message } = await del(`/blocked-users/${user.id}`);
    if (success) {
      dispatch(blockedUserDeleted(user.id));
    } else {
      console.error(message);
    }
  }, [del, dispatch, isBlocked, user]);

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
