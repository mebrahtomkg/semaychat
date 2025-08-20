import { useCallback, useEffect, useRef, useState } from 'react';

const useImageFileLoader = (file?: File) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const objectUrlRef = useRef<string>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      objectUrlRef.current = url;
      setIsLoading(true);
      setImageSrc(url);
    }

    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    };
  }, [file]);

  const handleImageLoad = useCallback((e) => {
    URL.revokeObjectURL(e.target.src);
    setIsLoading(false);
  }, []);

  return {
    isImageLoading: isLoading,
    imageSrc,
    handleImageLoad,
  };
};

export default useImageFileLoader;
