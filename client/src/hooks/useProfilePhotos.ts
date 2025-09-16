import { useQuery } from '@tanstack/react-query';
import { ApiError, get } from '@/api';
import { ProfilePhoto } from '@/types';
import queryClient from '@/queryClient';
import { useCallback } from 'react';

const PROFILE_PHOTOS_QUERY_KEY = 'profilePhotos';

const useProfilePhotos = () => {
  const { isError, data, error } = useQuery({
    queryKey: [PROFILE_PHOTOS_QUERY_KEY],
    queryFn: () => get<ProfilePhoto[]>('/profile-photos/me'),
    retry: (failureCount: number, error: Error) =>
      error instanceof ApiError && error.status ? false : failureCount < 2,
  });

  if (isError) {
    console.error(error);
  }

  const addProfilePhoto = useCallback((photo: ProfilePhoto) => {
    queryClient.setQueryData(
      [PROFILE_PHOTOS_QUERY_KEY],
      (photos: ProfilePhoto[]) => {
        if (!photos) return [photo];
        return [photo, ...photos];
      },
    );
  }, []);

  const deleteProfilePhoto = useCallback((photoId: number) => {
    queryClient.setQueryData(
      [PROFILE_PHOTOS_QUERY_KEY],
      (photos: ProfilePhoto[]) => {
        if (!photos) return photos;
        return photos.filter((photo) => photo.id !== photoId);
      },
    );
  }, []);

  return {
    profilePhotos: data || [],
    addProfilePhoto,
    deleteProfilePhoto,
  };
};

export default useProfilePhotos;
