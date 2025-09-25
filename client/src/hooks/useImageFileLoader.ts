import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

const useImageFileLoader = (file?: File) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
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

  const handleImageLoad = useCallback((e: SyntheticEvent<HTMLImageElement>) => {
    URL.revokeObjectURL(e.currentTarget.src);
    setIsLoading(false);
  }, []);

  return {
    isImageLoading: isLoading,
    imageSrc,
    handleImageLoad,
  };
};

export default useImageFileLoader;
