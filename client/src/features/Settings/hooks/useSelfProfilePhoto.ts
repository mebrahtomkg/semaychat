import { useCallback } from 'react';
import { profilePhotoDeleted } from '../slices/profilePhotosSlice';
import { useAPI, useAppDispatch, useProfilePhoto } from '../../../hooks';
import { ProfilePhoto } from '../../../types';

const useSelfProfilePhoto = (photo: ProfilePhoto) => {
  const { photoUrl, photoDateTime, downloadPhoto } = useProfilePhoto(photo);

  const { isLoading, del } = useAPI();

  const dispatch = useAppDispatch();

  const deletePhoto = useCallback(async () => {
    if (!photo) return;
    const { success, message } = await del(`/profile-photos/me/${photo.id}`);
    if (success) {
      dispatch(profilePhotoDeleted(photo.id));
      console.log(message);
    } else {
      console.error(message);
    }
  }, [photo, del, dispatch]);

  return {
    photoUrl,
    photoDateTime,
    downloadPhoto,
    isDoingRequest: isLoading,
    deletePhoto,
  };
};

export default useSelfProfilePhoto;
