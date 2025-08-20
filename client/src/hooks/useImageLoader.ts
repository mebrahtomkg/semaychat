import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ApiError, get } from '@/api';
import { useQuery } from '@tanstack/react-query';

const useImageLoader = (imageUrl: string | null | undefined) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const [isImageLoading, setIsImageLoading] = useState(false);

  const objectUrlRef = useRef<string | null>(null);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['image', imageUrl],
    queryFn: async () => {
      if (!imageUrl) return null;
      const blob = await get<Blob>(imageUrl, { responseType: 'blob' });
      return URL.createObjectURL(blob);
    },
    staleTime: 0,
    retry: (failureCount: number, error: Error) =>
      error instanceof ApiError && error.status ? false : failureCount < 2,
  });

  useEffect(() => {
    if (data) {
      objectUrlRef.current = data;
      setIsImageLoading(true);
      setImageSrc(data);
    }

    const cleanup = () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    };

    return cleanup;
  }, [data]);

  if (isError) console.error(error);

  const handleImageLoad = useCallback((e: SyntheticEvent<HTMLImageElement>) => {
    URL.revokeObjectURL(e.currentTarget.src);
    setIsImageLoading(false);
  }, []);

  return {
    isImageFetching: isLoading,
    isImageLoading,
    imageSrc,
    handleImageLoad,
  };
};

export default useImageLoader;
