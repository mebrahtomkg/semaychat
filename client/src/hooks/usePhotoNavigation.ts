import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDebounce } from '.';

const usePhotoNavigation = (
  photosCount: number,
  initialIndex = 0,
  resetNavWhenPhotosCountIncreases = false,
) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handleNext = useCallback(() => {
    const nextNumber = currentIndex + 1;
    setCurrentIndex(nextNumber < photosCount ? nextNumber : 0);
  }, [photosCount, currentIndex]);

  const handlePrevious = useCallback(() => {
    const prevNumber = currentIndex - 1;
    setCurrentIndex(prevNumber >= 0 ? prevNumber : photosCount - 1);
  }, [photosCount, currentIndex]);

  const { debounce } = useDebounce();

  const handleKeyNavigation = useCallback(
    (e) =>
      debounce(() => {
        const focusedElem = document.activeElement;
        if (!(focusedElem instanceof HTMLElement)) return;
        if (!focusedElem.dataset.isPhotoNavTarget) return;
        if (e.key === 'ArrowLeft') handlePrevious();
        if (e.key === 'ArrowRight') handleNext();
      }, 400),
    [debounce, handlePrevious, handleNext],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyNavigation);
    return () => {
      document.removeEventListener('keydown', handleKeyNavigation);
    };
  }, [handleKeyNavigation]);

  useEffect(() => {
    if (currentIndex >= photosCount) setCurrentIndex(0);
  }, [currentIndex, photosCount]);

  const photosCountRef = useRef(photosCount);

  useEffect(() => {
    const prevCount = photosCountRef.current;
    photosCountRef.current = photosCount;
    if (photosCount > prevCount && resetNavWhenPhotosCountIncreases)
      setCurrentIndex(0);
  }, [photosCount, resetNavWhenPhotosCountIncreases]);

  const photoIndexIndicator = useMemo(
    () => `${currentIndex + 1} of ${photosCount}`,
    [currentIndex, photosCount],
  );

  return {
    currentIndex,
    handleNext,
    handlePrevious,
    photoIndexIndicator,
  };
};

export default usePhotoNavigation;
