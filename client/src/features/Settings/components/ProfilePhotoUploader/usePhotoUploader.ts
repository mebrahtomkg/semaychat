import { useCallback, useState } from 'react';
import { useProfilePhotos } from '@/hooks';
import { ProfilePhoto } from '@/types';
import { post } from '@/api';
import { useMutation } from '@tanstack/react-query';

const UPLOAD_ERRORS = {
  UNKNOWN_ERROR: 'Photo upload failed for unknown reason. Please try again.',
};

interface PhotoUploaderOptions {
  cropImage: () => Promise<Blob | null>;
  onSuccess: () => void;
  fileName: string;
}

const usePhotoUploader = ({
  cropImage,
  onSuccess,
  fileName,
}: PhotoUploaderOptions) => {
  const [error, setError] = useState<string>('');
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
    const blob = await cropImage();
    if (blob) {
      const formData = new FormData();
      formData.append('profilePhoto', blob, fileName);
      mutate(formData);
    }
  }, [cropImage, mutate, fileName]);

  return {
    isUploading: isPending,
    error,
    uploadPhoto,
  };
};

export default usePhotoUploader;
