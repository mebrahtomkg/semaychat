import {
  MouseEventHandler,
  TouchEventHandler,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { Position } from './types';

interface DragStartInfo {
  pointerX: number;
  pointerY: number;
  imageX: number;
  imageY: number;
}

interface ImageDraggingOptions {
  imagePosition: Position;
  onPositionUpdate: (position: Position) => void;
  onDragEnd: () => void;
}

const useImageDragging = ({
  imagePosition,
  onPositionUpdate,
  onDragEnd,
}: ImageDraggingOptions) => {
  const imageX = imagePosition.x;
  const imageY = imagePosition.y;

  const isDraggingRef = useRef(false);

  const dragStartInfoRef = useRef<DragStartInfo>({
    pointerX: 0,
    pointerY: 0,
    imageX,
    imageY,
  });

  const startDrag = useCallback(
    (clientX: number, clientY: number) => {
      dragStartInfoRef.current = {
        pointerX: clientX,
        pointerY: clientY,
        imageX,
        imageY,
      };
      isDraggingRef.current = true;
    },
    [imageX, imageY],
  );

  const endDrag = useCallback(() => {
    isDraggingRef.current = false;
    onDragEnd();
  }, [onDragEnd]);

  const updateImagePosition = useCallback(
    (clientX: number, clientY: number) => {
      const { pointerX, pointerY, imageX, imageY } = dragStartInfoRef.current;
      const deltaX = clientX - pointerX;
      const deltaY = clientY - pointerY;
      onPositionUpdate({
        x: imageX + deltaX,
        y: imageY + deltaY,
      });
    },
    [onPositionUpdate],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      updateImagePosition(e.clientX, e.clientY);
    },
    [updateImagePosition],
  );

  const handleMouseDown: MouseEventHandler = useCallback(
    (e) => {
      startDrag(e.clientX, e.clientY);
      document.addEventListener('mousemove', handleMouseMove);
    },
    [startDrag, handleMouseMove],
  );

  const handleMouseUp = useCallback(() => {
    document.removeEventListener('mousemove', handleMouseMove);
    endDrag();
  }, [endDrag, handleMouseMove]);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      updateImagePosition(e.touches[0].clientX, e.touches[0].clientY);
    },
    [updateImagePosition],
  );

  const handleTouchStart: TouchEventHandler = useCallback(
    (e) => {
      startDrag(e.touches[0].clientX, e.touches[0].clientY);
      document.addEventListener('touchmove', handleTouchMove);
    },
    [startDrag, handleTouchMove],
  );

  const handleTouchEnd = useCallback(() => {
    document.removeEventListener('touchmove', handleTouchMove);
    endDrag();
  }, [endDrag, handleTouchMove]);

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleTouchEnd);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleMouseUp, handleTouchEnd]);

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handleMouseMove, handleTouchMove]);

  return {
    handleMouseDown,
    handleTouchStart,
    isDraggingRef,
  };
};

export default useImageDragging;
