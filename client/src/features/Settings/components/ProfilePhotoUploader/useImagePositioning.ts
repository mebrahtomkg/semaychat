import {
  MouseEventHandler,
  TouchEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

interface Position {
  x: number;
  y: number;
}

interface DragStartInfo {
  pointerX: number;
  pointerY: number;
  imageX: number;
  imageY: number;
}

const useImagePositioning = () => {
  const croppingViewportRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [imagePosition, setImagePosition] = useState<Position>({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);

  const dragStartInfoRef = useRef<DragStartInfo>({
    pointerX: 0,
    pointerY: 0,
    imageX: 0,
    imageY: 0,
  });

  const startImageDrag = useCallback(
    (clientX: number, clientY: number) => {
      dragStartInfoRef.current = {
        pointerX: clientX,
        pointerY: clientY,
        imageX: imagePosition.x,
        imageY: imagePosition.y,
      };
      isDraggingRef.current = true;
    },
    [imagePosition.x, imagePosition.y],
  );

  const updateImagePosition = useCallback(
    (clientX: number, clientY: number) => {
      if (!isDraggingRef.current) return;
      const { pointerX, pointerY, imageX, imageY } = dragStartInfoRef.current;
      const deltaX = clientX - pointerX;
      const deltaY = clientY - pointerY;
      setImagePosition({
        x: imageX + deltaX,
        y: imageY + deltaY,
      });
    },
    [],
  );

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

  const handlePointerUp = useCallback(() => {
    isDraggingRef.current = false;
    snapImageToCenterIfOutOfBounds();
  }, [snapImageToCenterIfOutOfBounds]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      updateImagePosition(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      updateImagePosition(e.touches[0].clientX, e.touches[0].clientY);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('mouseup', handlePointerUp);
    document.addEventListener('touchend', handlePointerUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseup', handlePointerUp);
      document.removeEventListener('touchend', handlePointerUp);
    };
  }, [updateImagePosition, handlePointerUp]);

  const handleMouseDown: MouseEventHandler = useCallback(
    (e) => startImageDrag(e.clientX, e.clientY),
    [startImageDrag],
  );

  const handleTouchStart: TouchEventHandler = useCallback(
    (e) => startImageDrag(e.touches[0].clientX, e.touches[0].clientY),
    [startImageDrag],
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
