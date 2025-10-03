import { useMemo } from 'react';
import { calculateFullName, calculateNameInitials } from '@/utils';
import { User } from '@/types';
import useBlockedUsers from './useBlockedUsers';
import useContacts from './useContacts';

const useUserInfo = (user: User) => {
  const blockedUsers = useBlockedUsers();

  const contacts = useContacts();

  const { firstName, lastName, profilePhoto } = user;

  const fullName = useMemo(
    () => calculateFullName(firstName, lastName),
    [firstName, lastName],
  );

  const nameInitials = useMemo(
    () => calculateNameInitials(firstName, lastName),
    [firstName, lastName],
  );

  const photoUrl = useMemo(
    () =>
      profilePhoto?.name
        ? `/profile-photos/file/${profilePhoto.name}`
        : undefined,
    [profilePhoto?.name],
  );

  const isBlocked = useMemo(
    () => blockedUsers.some((blockedUser) => blockedUser.id === user.id),
    [blockedUsers, user.id],
  );

  const isContact = useMemo(
    () => contacts.some((contact) => contact.id === user.id),
    [contacts, user.id],
  );

  return {
    fullName,
    nameInitials,
    photoUrl,
    isBlocked,
    isContact,
  };
};

export default useUserInfo;
