import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { get } from '@/api';

const useImageLoader = (imageUrl?: string) => {
  // The html img tag's src attr type is `string | undefined`.
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
  const objectUrlRef = useRef<string | null>(null);
  const [isImageLoadError, setIsImageLoadError] = useState<boolean>(false);

  const fetchAndLoadImage = useCallback(async (url: string) => {
    let blob: Blob | null = null;

    setIsImageLoadError(false);
    setIsImageLoading(true);
    try {
      blob = await get<Blob>(url, { responseType: 'blob' });
    } catch (err) {
      console.error('useImageLoader:', err);
    }

    if (!blob) return setIsImageLoading(false);

    const src = URL.createObjectURL(blob);
    objectUrlRef.current = src;
    setImageSrc(src);
  }, []);

  const cleanup = useCallback(() => {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    objectUrlRef.current = null;
  }, []);

  useEffect(() => {
    if (imageUrl) fetchAndLoadImage(imageUrl);
    return cleanup;
  }, [imageUrl, fetchAndLoadImage, cleanup]);

  const handleImageLoad = useCallback((e: SyntheticEvent<HTMLImageElement>) => {
    URL.revokeObjectURL(e.currentTarget.src);
    setIsImageLoading(false);
  }, []);

  const handleImageLoadError = useCallback(
    (e: SyntheticEvent<HTMLImageElement>) => {
      URL.revokeObjectURL(e.currentTarget.src);
      setIsImageLoadError(true);
      setIsImageLoading(false);
    },
    [],
  );

  return {
    imageSrc,
    isImageLoading,
    isImageLoadError,
    handleImageLoad,
    handleImageLoadError,
  };
};

export default useImageLoader;
