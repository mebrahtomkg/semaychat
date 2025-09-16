import { useCallback, useEffect, useRef, useState } from 'react';
import { getSizeInAppropriateUnit, isImageFile } from './utils';
import { useAPI, useProfilePhotos } from '@/hooks';
import { ProfilePhoto } from '@/types';

const MIN_IMAGE_FILE_SIZE = 1 * 1024;
const MAX_IMAGE_FILE_SIZE = 5 * 1024 * 1024;

const IMAGE_ERRORS = {
  INVALID_FILE: 'Invalid file',
  INVALID_FILE_TYPE: 'Invalid file type! Only image is allowed',
  SIZE_TOO_SMALL: `Image size too small. 
                      Minimum size is ${getSizeInAppropriateUnit(MIN_IMAGE_FILE_SIZE)}.`,
  SIZE_TOO_BIG: `Image size too big.
                    Maximum size is ${getSizeInAppropriateUnit(MAX_IMAGE_FILE_SIZE)}.`,
};

const UPLOAD_ERRORS = {
  CROPPING_FAILED: 'Image cropping failed. Please try again.',
  NETWORK_ERROR: 'Network error. Please try again.', // Not used
  UNKNOWN_ERROR: 'Photo upload failed for unknown reason. Please try again.',
};

const validateImageFile = (file: File) => {
  if (!(file instanceof File)) return IMAGE_ERRORS.INVALID_FILE;
  if (!isImageFile(file)) return IMAGE_ERRORS.INVALID_FILE_TYPE;
  if (file.size < MIN_IMAGE_FILE_SIZE) return IMAGE_ERRORS.SIZE_TOO_SMALL;
  if (file.size > MAX_IMAGE_FILE_SIZE) return IMAGE_ERRORS.SIZE_TOO_BIG;
  return null;
};

const useProfilePhotoUploader = ({
  file,
  onClose,
  imageCropperFunc,
}: {
  file: File;
  onClose: () => void;
  imageCropperFunc: () => Blob;
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);

  const objUrlRef = useRef<string | null>(null);

  useEffect(() => {
    const fileError = validateImageFile(file);
    if (fileError) {
      setError(fileError);
    } else {
      const url = URL.createObjectURL(file);
      objUrlRef.current = url;
      setImageSrc(url);
    }

    return () => {
      if (objUrlRef.current) URL.revokeObjectURL(objUrlRef.current);
    };
  }, [file]);

  const { isLoading, post } = useAPI();
  const isDoingUploadRef = useRef(false);

  const { addProfilePhoto } = useProfilePhotos();

  const uploadPhoto = useCallback(async () => {
    if (isDoingUploadRef.current) return;
    isDoingUploadRef.current = true;
    try {
      setIsCropping(true);

      // Important! Let the UI update before entering in to heavy image cropping task.
      await new Promise((resolve) => setTimeout(resolve, 50));

      const blob = await imageCropperFunc();

      setIsCropping(false);

      if (!blob) {
        setError(UPLOAD_ERRORS.CROPPING_FAILED);
        console.error('Image cropping failed. did not get valid blob.');
        return;
      }

      const formData = new FormData();
      formData.append('profilePhoto', blob);

      const { success, data, message } = await post<ProfilePhoto>(
        '/profile-photos/me',
        formData,
      );

      if (success) {
        addProfilePhoto(data);
        onClose();
        console.log(message);
      } else {
        setError(message || UPLOAD_ERRORS.UNKNOWN_ERROR);
      }
    } catch (err) {
      console.error(
        (err as Error).message ||
          'Unknown error occured at profile photo upload.',
      );
      setError((err as Error).message || UPLOAD_ERRORS.UNKNOWN_ERROR);
    }
    isDoingUploadRef.current = false;
  }, [imageCropperFunc, post, addProfilePhoto, onClose]);

  return { imageSrc, isUploading: isLoading || isCropping, error, uploadPhoto };
};

export default useProfilePhotoUploader;
