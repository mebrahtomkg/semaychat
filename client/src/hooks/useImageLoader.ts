import { useCallback, useEffect, useRef, useState } from 'react';
import { useAPI } from '.';

const useImageLoader = (url: string | null) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const objectUrlRef = useRef<string | null>(null);

  const { isLoading: isImageFetching, get } = useAPI();

  useEffect(() => {
    const fetchAndLoadImage = async () => {
      try {
        if (!url) return;

        const { success, data, message } = await get<Blob>(url, {
          responseType: 'blob'
        });

        if (success && data) {
          const imgSrc = URL.createObjectURL(data);
          objectUrlRef.current = imgSrc;
          setIsLoading(true);
          setImageSrc(imgSrc);
        } else {
          //console.error(message);
        }
      } catch (err) {
        setIsLoading(false);
        console.error(err);
      }
    };

    const cleanup = () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    };

    cleanup();

    if (url) {
      fetchAndLoadImage();
    } else {
      setImageSrc(null);
    }

    return cleanup;
  }, [url, get]);

  const handleImageLoad = useCallback((e) => {
    URL.revokeObjectURL(e.target.src);
    setIsLoading(false);
  }, []);

  return {
    isImageFetching,
    isImageLoading: isLoading,
    imageSrc,
    handleImageLoad
  };
};

export default useImageLoader;
