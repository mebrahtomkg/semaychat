import { useCallback, useMemo } from 'react';
import { calculateFullName, calculateNameInitials } from '../utils';
import { useAPI, useAppSelector } from '.';

const useAccount = () => {
  const account = useAppSelector((state) => state.account);
  if (!account) throw new Error('Invalid account!');

  const profilePhotos = useAppSelector((state) => state.profilePhotos);

  const { firstName, lastName } = account;

  const fullName = useMemo(
    () => calculateFullName(firstName, lastName),
    [firstName, lastName]
  );

  const nameInitials = useMemo(
    () => calculateNameInitials(firstName, lastName),
    [firstName, lastName]
  );

  const photoUrl = useMemo(() => {
    const photoId = profilePhotos[0]?.id;
    return photoId ? `/profile-photos/${photoId}/file` : null;
  }, [profilePhotos]);

  const { post } = useAPI();

  const logout = useCallback(async () => {
    const { success, message } = await post('/auth/logout', {});
    if (success) {
      location = `${location.origin}/login` as unknown as Location;
    } else {
      console.error(message);
    }
  }, [post]);

  return {
    ...account,
    fullName,
    nameInitials,
    photoUrl,
    logout
  };
};

export default useAccount;
