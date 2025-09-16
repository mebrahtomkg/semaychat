import { useCallback } from 'react';
import { useAPI, useProfilePhoto, useProfilePhotos } from '@/hooks';
import { ProfilePhoto } from '@/types';

const useSelfProfilePhoto = (photo: ProfilePhoto) => {
  const { photoUrl, photoDateTime, downloadPhoto } = useProfilePhoto(photo);

  const { isLoading, del } = useAPI();

  const { deleteProfilePhoto } = useProfilePhotos();

  const deletePhoto = useCallback(async () => {
    if (!photo) return;
    const { success, message } = await del(`/profile-photos/me/${photo.id}`);
    if (success) {
      deleteProfilePhoto(photo.id);
      console.log(message);
    } else {
      console.error(message);
    }
  }, [photo, del, deleteProfilePhoto]);

  return {
    photoUrl,
    photoDateTime,
    downloadPhoto,
    isDoingRequest: isLoading,
    deletePhoto,
  };
};

export default useSelfProfilePhoto;
