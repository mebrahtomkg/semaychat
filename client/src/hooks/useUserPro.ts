import { useMemo } from 'react';
import { calculateFullName, calculateNameInitials } from '../utils';
import { useAppSelector } from '.';

const useUser = (userId?: number) => {
  const [user] = useAppSelector((state) =>
    state.users.filter((user) => user.id === userId),
  );

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
