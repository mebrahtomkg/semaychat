import { useCallback, useMemo } from 'react';
import { formatDateTime } from '../utils';
import { useDownload } from '.';
import { ProfilePhoto } from '@/types';

const useProfilePhoto = (photo: ProfilePhoto) => {
  const photoUrl = useMemo(
    () => (photo ? `/profile-photos/${photo.id}/file` : undefined),
    [photo],
  );

  const photoDateTime = useMemo(
    () => photo && formatDateTime(photo.createdAt),
    [photo],
  );

  const download = useDownload();

  const downloadPhoto = useCallback(() => {
    if (photo) download(`/profile-photos/${photo.id}`, `${photo.id}`, 'png');
  }, [photo, download]);

  return { photoUrl, photoDateTime, downloadPhoto };
};

export default useProfilePhoto;
