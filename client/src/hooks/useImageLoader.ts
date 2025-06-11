import { useCallback, useEffect, useRef, useState } from 'react';
import { ApiError, get } from '@/api';
import { useQuery } from '@tanstack/react-query';

const useImageLoader = (endpoint: string | null) => {
  // const { isLoading: isImageFetching, get } = useAPI();

  // useEffect(() => {
  //   const fetchAndLoadImage = async () => {
  //     try {
  //       if (!url) return;

  //       const { success, data, message } = await get<Blob>(url, {
  //         responseType: 'blob'
  //       });

  //       if (success && data) {
  //         const imgSrc = URL.createObjectURL(data);
  //         objectUrlRef.current = imgSrc;
  //         setIsLoading(true);
  //         setImageSrc(imgSrc);
  //       } else {
  //         //console.error(message);
  //       }
  //     } catch (err) {
  //       setIsLoading(false);
  //       console.error(err);
  //     }
  //   };

  //   const cleanup = () => {
  //     if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
  //     objectUrlRef.current = null;
  //   };

  //   cleanup();

  //   if (url) {
  //     fetchAndLoadImage();
  //   } else {
  //     setImageSrc(null);
  //   }

  //   return cleanup;
  // }, [url, get]);

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const objectUrlRef = useRef<string | null>(null);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['image', endpoint],
    queryFn: async () => {
      if (!endpoint) return null;

      const blob = await get<Blob>(endpoint, { responseType: 'blob' });
      return URL.createObjectURL(blob);
    },
    retry: (failureCount: number, error: Error) =>
      error instanceof ApiError && error.status ? false : failureCount < 2
  });

  useEffect(() => {
    if (data) {
      // const imgSrc = URL.createObjectURL(data);
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

  if (isError) {
    console.error(error);
  }

  const handleImageLoad = useCallback((e) => {
    URL.revokeObjectURL(e.target.src);
    setIsImageLoading(false);
  }, []);

  return {
    isImageFetching: isLoading,
    isImageLoading:false,
    imageSrc,
    handleImageLoad
  };
};

export default useImageLoader;
