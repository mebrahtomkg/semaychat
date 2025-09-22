import { useCallback, useState } from 'react';
import { useProfilePhoto, useProfilePhotos } from '@/hooks';
import { ProfilePhoto } from '@/types';
import { del } from '@/api';

const useSelfProfilePhoto = (photo: ProfilePhoto) => {
  const { photoUrl, photoDateTime, downloadPhoto } = useProfilePhoto(photo);

  const [isLoading, setIsLoading] = useState(false);

  const { deleteProfilePhoto } = useProfilePhotos();

  const deletePhoto = useCallback(async () => {
    if (!photo) return;
    setIsLoading(true);
    try {
      await del(`/profile-photos/me/${photo.id}`);
      deleteProfilePhoto(photo.id);
    } catch (err) {
      console.error((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [photo, deleteProfilePhoto]);

  return {
    photoUrl,
    photoDateTime,
    downloadPhoto,
    isDoingRequest: isLoading,
    deletePhoto,
  };
};

export default useSelfProfilePhoto;
