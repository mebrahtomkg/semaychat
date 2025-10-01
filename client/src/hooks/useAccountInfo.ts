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
    const photoName = profilePhotos[0]?.name;
    return photoName ? `/profile-photos/file/${photoName}` : undefined;
  }, [profilePhotos]);

  return {
    ...account,
    fullName,
    nameInitials,
    photoUrl,
  };
};

export default useAccountInfo;
