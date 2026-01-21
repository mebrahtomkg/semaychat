import { useCallback, useRef, useState } from 'react';
import { Position } from './types';
import useImageDragging from './useImageDragging';

const useImagePositioning = () => {
  const croppingViewportRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [imagePosition, setImagePosition] = useState<Position>({ x: 0, y: 0 });

  const recenterImage = useCallback(() => {
    if (!croppingViewportRef.current || !imageRef.current) return;
    const viewportRect = croppingViewportRef.current.getBoundingClientRect();
    const imageRect = imageRef.current.getBoundingClientRect();
    const newX = (viewportRect.width - imageRect.width) / 2;
    const newY = (viewportRect.height - imageRect.height) / 2;
    setImagePosition({ x: Math.round(newX), y: Math.round(newY) });
  }, []);

  const snapImageToCenterIfOutOfBounds = useCallback(() => {
    if (!croppingViewportRef.current || !imageRef.current) return;
    const viewportRect = croppingViewportRef.current.getBoundingClientRect();
    const imageRect = imageRef.current.getBoundingClientRect();
    const threshold = 0.25;
    const isOutOfBounds =
      imageRect.left + imageRect.width * threshold >= viewportRect.right ||
      imageRect.right - imageRect.width * threshold <= viewportRect.left ||
      imageRect.top + imageRect.height * threshold >= viewportRect.bottom ||
      imageRect.bottom - imageRect.height * threshold <= viewportRect.top;
    if (isOutOfBounds) recenterImage();
  }, [recenterImage]);

  const { handleMouseDown, handleTouchStart, isDraggingRef } = useImageDragging(
    {
      imagePosition,
      onPositionUpdate: setImagePosition,
      onDragEnd: snapImageToCenterIfOutOfBounds,
    },
  );

  return {
    croppingViewportRef,
    imageRef,
    imagePosition,
    isDraggingRef,
    recenterImage,
    handleMouseDown,
    handleTouchStart,
  };
};

export default useImagePositioning;
