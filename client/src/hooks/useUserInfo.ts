import { useMemo } from 'react';
import { calculateFullName, calculateNameInitials } from '@/utils';
import { User } from '@/types';

const useUserInfo = (user: User) => {
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

  return {
    fullName,
    nameInitials,
    photoUrl,
  };
};

export default useUserInfo;
