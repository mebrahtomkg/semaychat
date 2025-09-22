import { useMemo } from 'react';
import { calculateFullName, calculateNameInitials } from '../utils';
import { useAccount, useProfilePhotos } from '.';

const useAccountInfo = () => {
  const account = useAccount();

  const { profilePhotos } = useProfilePhotos();

  const { firstName, lastName } = account;

  const fullName = useMemo(
    () => calculateFullName(firstName, lastName),
    [firstName, lastName],
  );

  const nameInitials = useMemo(
    () => calculateNameInitials(firstName, lastName),
    [firstName, lastName],
  );

  const photoUrl = useMemo(() => {
    const photoId = profilePhotos[0]?.id;
    return photoId ? `/profile-photos/${photoId}/file` : null;
  }, [profilePhotos]);

  return {
    ...account,
    fullName,
    nameInitials,
    photoUrl,
  };
};

export default useAccountInfo;
