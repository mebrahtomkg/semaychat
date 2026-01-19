import { useCallback, useState } from 'react';
import { useProfilePhotos } from '@/hooks';
import { ProfilePhoto } from '@/types';
import { post } from '@/api';
import { useMutation } from '@tanstack/react-query';

const UPLOAD_ERRORS = {
  CROPPING_FAILED: 'Image cropping failed. Please try again.',
  UNKNOWN_ERROR: 'Photo upload failed for unknown reason. Please try again.',
};

const usePhotoUploader = (
  cropImage: () => Promise<Blob | null>,
  onSuccess: () => void,
  fileName: string,
) => {
  const [error, setError] = useState<string>('');
  const [isCropping, setIsCropping] = useState(false);
  const { addProfilePhoto } = useProfilePhotos();

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => {
      return post<ProfilePhoto>('/profile-photos/me', formData);
    },
    onMutate: async () => {},
    onError: (err) => {
      setError(err.message || UPLOAD_ERRORS.UNKNOWN_ERROR);
    },
    onSuccess(data) {
      addProfilePhoto(data);
      onSuccess();
    },
  });

  const uploadPhoto = useCallback(async () => {
    setIsCropping(true);

    // Important! Let the UI update (the setIsCropping state) before entering in to heavy task.
    await new Promise((resolve) => setTimeout(resolve, 50));

    let blob: Blob | null = null;
    try {
      blob = await cropImage();
    } catch (err) {
      console.error(err);
      setError(UPLOAD_ERRORS.CROPPING_FAILED);
    }
    setIsCropping(false);

    if (!blob) {
      setError(UPLOAD_ERRORS.CROPPING_FAILED);
      return;
    }

    const formData = new FormData();
    formData.append('profilePhoto', blob, fileName);
    mutate(formData);
  }, [cropImage, mutate, fileName]);

  return {
    isUploading: isPending || isCropping,
    error,
    uploadPhoto,
  };
};

export default usePhotoUploader;
