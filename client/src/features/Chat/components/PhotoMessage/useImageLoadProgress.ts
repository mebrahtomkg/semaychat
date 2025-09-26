import { SyntheticEvent, useCallback, useEffect, useState } from 'react';

const useImageLoadProgress = (imageSrc: string | undefined) => {
  const [isLoading, setIsLoading] = useState<boolean>(!!imageSrc);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(!!imageSrc);
    setIsError(false);
  }, [imageSrc]);

  const handleImageLoad = useCallback(
    (_e: SyntheticEvent<HTMLImageElement>) => {
      setIsLoading(false);
    },
    [],
  );

  const handleImageLoadError = useCallback(
    (_e: SyntheticEvent<HTMLImageElement>) => {
      setIsLoading(false);
      setIsError(true);
    },
    [],
  );

  return {
    isImageLoading: isLoading,
    isImageLoadError: isError,
    handleImageLoad,
    handleImageLoadError,
  };
};

export default useImageLoadProgress;
