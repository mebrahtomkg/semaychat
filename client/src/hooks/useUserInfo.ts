import { useMemo } from 'react';
import { calculateFullName, calculateNameInitials } from '@/utils';
import { User } from '@/types';
import useBlockedUsers from './useBlockedUsers';
import useContacts from './useContacts';
import formatLastseenTimestamp from '@/features/Chat/components/ChatPartner/formatLastseenTimestamp';
import useCurrentDateTime from './useCurrentDateTime';

const useUserInfo = (user: User) => {
  const blockedUsers = useBlockedUsers();
  const currentDateTime = useCurrentDateTime();
  const contacts = useContacts();

  const { firstName, lastName, profilePhoto, isOnline, lastSeenAt } = user;

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

  const status: string = useMemo(() => {
    if (isOnline) return 'online';

    if (lastSeenAt) {
      return `last seen at ${formatLastseenTimestamp(lastSeenAt, currentDateTime)}`;
    }

    return 'last seen recently';
  }, [isOnline, lastSeenAt, currentDateTime]);

  return {
    fullName,
    nameInitials,
    photoUrl,
    isBlocked,
    isContact,
    status,
  };
};

export default useUserInfo;
