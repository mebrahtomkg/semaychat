import { useMemo } from 'react';
import { calculateFullName, calculateNameInitials } from '@/utils';
import { useBlockedUsers, useChats, useContacts, useUsersSuggestion } from '.';

const useUser = (userId?: number) => {
  const realChats = useChats();
  const blockedUsers = useBlockedUsers();
  const contacts = useContacts();
  const usersSuggestion = useUsersSuggestion();

  const [user] = [
    ...realChats.map((chat) => chat.partner),
    ...blockedUsers,
    ...contacts,
    ...usersSuggestion,
  ].filter((user) => user.id === userId);

  const fullName = useMemo(
    () => (user ? calculateFullName(user.firstName, user.lastName) : '??'),
    [user],
  );

  const nameInitials = useMemo(
    () => (user ? calculateNameInitials(user.firstName, user.lastName) : '??'),
    [user],
  );

  const photoUrl = useMemo(
    () =>
      user?.profilePhoto?.id
        ? `/profile-photos/${user.profilePhoto.id}/file`
        : null,
    [user?.profilePhoto?.id],
  );

  return {
    fullName,
    nameInitials,
    photoUrl,
  };
};

export default useUser;
