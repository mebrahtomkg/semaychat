import { useMemo } from 'react';
import { calculateFullName, calculateNameInitials } from '@/utils';
import { User } from '@/types';

const useContact = (user: User) => {
  const { firstName, lastName, profilePhoto } = user;

  const photoUrl = useMemo(() => {
    const photoId = profilePhoto?.id;
    return photoId ? `/profile-photos/${photoId}/file` : undefined;
  }, [profilePhoto]);

  const fullName = useMemo(
    () => calculateFullName(firstName, lastName),
    [firstName, lastName],
  );

  const nameInitials = useMemo(
    () => calculateNameInitials(firstName, lastName),
    [firstName, lastName],
  );

  return { photoUrl, nameInitials, fullName, id: user.id };
};

export default useContact;
