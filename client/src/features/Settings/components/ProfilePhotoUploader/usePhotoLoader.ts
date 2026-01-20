import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getSizeInAppropriateUnit } from './utils';
import z from 'zod';

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

const imageFileSchema = z
  .file(IMAGE_ERRORS.INVALID_FILE)
  .mime(
    ['image/png', 'image/jpeg', 'image/gif', 'image/svg+xml', 'image/webp'],
    IMAGE_ERRORS.INVALID_FILE_TYPE,
  )
  .min(MIN_IMAGE_FILE_SIZE, IMAGE_ERRORS.SIZE_TOO_SMALL)
  .max(MAX_IMAGE_FILE_SIZE, IMAGE_ERRORS.SIZE_TOO_BIG);

const usePhotoLoader = (file: File, onImageLoad: () => void) => {
  const objUrlRef = useRef<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const result = imageFileSchema.safeParse(file);
    if (result.success) {
      const url = URL.createObjectURL(result.data);
      objUrlRef.current = url;
      setImageSrc(url);
    } else {
      setError(result.error.issues[0].message);
    }

    return () => {
      if (objUrlRef.current) URL.revokeObjectURL(objUrlRef.current);
    };
  }, [file]);

  const handleImageLoad = useCallback(
    (e: SyntheticEvent<HTMLImageElement>) => {
      setIsImageLoaded(true);
      URL.revokeObjectURL(e.currentTarget.src);
      onImageLoad();
    },
    [onImageLoad],
  );

  const handleImageLoadError = useCallback(
    (e: SyntheticEvent<HTMLImageElement>) => {
      URL.revokeObjectURL(e.currentTarget.src);
      setError('Failed to load photo.');
    },
    [],
  );

  return {
    imageSrc,
    handleImageLoad,
    handleImageLoadError,
    isImageLoaded,
    error,
  };
};

export default usePhotoLoader;
