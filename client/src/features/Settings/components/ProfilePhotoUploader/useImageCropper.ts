import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useZoomController from './useZoomController';

const useImageCropper = () => {
  const {
    imageWidth,
    zoomPercentage,
    updateZoomPercentage,
    adjustZoomOnWheelEvent,
  } = useZoomController();

  const croppingViewportRef = useRef<HTMLDivElement | null>(null);

  const imageRef = useRef<HTMLImageElement | null>(null);

  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const isDragging = useRef(false);

  const dragStartPositionsRef = useRef({
    imagePosition: { x: 0, y: 0 },
    pointerPosition: { x: 0, y: 0 },
  });

  const startImageDrag = useCallback(
    (clientX, clientY) => {
      dragStartPositionsRef.current = {
        imagePosition: { x: imagePosition.x, y: imagePosition.y },
        pointerPosition: { x: clientX, y: clientY },
      };
      isDragging.current = true;
    },
    [imagePosition],
  );

  const updateImagePosition = useCallback((clientX, clientY) => {
    if (!isDragging.current) return;
    const { imagePosition: imgPosition, pointerPosition } =
      dragStartPositionsRef.current;
    const xDistance = clientX - pointerPosition.x;
    const yDistance = clientY - pointerPosition.y;
    setImagePosition({
      x: imgPosition.x + xDistance,
      y: imgPosition.y + yDistance,
    });
  }, []);

  const recenterImage = useCallback(() => {
    if (!croppingViewportRef.current || !imageRef.current) return;
    const viewportRect = croppingViewportRef.current.getBoundingClientRect();
    const imageRect = imageRef.current.getBoundingClientRect();
    const newX = (viewportRect.width - imageRect.width) / 2;
    const newY = (viewportRect.height - imageRect.height) / 2;
    setImagePosition({ x: Math.round(newX), y: Math.round(newY) });
  }, []);

  const handleImageLoad = useCallback(
    (e) => {
      setIsImageLoaded(true);
      URL.revokeObjectURL(e.target.src);
      recenterImage();
    },
    [recenterImage],
  );

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

  const cropImage = useCallback(
    () =>
      new Promise((resolve, reject) => {
        if (!imageRef.current || !croppingViewportRef.current) {
          reject('Failed to get DOM elements while cropping image.');
          return;
        }
        const viewportRect =
          croppingViewportRef.current.getBoundingClientRect();
        const image = imageRef.current;
        const imageRect = image.getBoundingClientRect();

        const pixelRatioX = image.naturalWidth / imageRect.width;
        const pixelRatioY = image.naturalHeight / imageRect.height;

        const sourceX = -1 * imagePosition.x * pixelRatioX;
        const sourceY = -1 * imagePosition.y * pixelRatioY;

        const sourceWidth = viewportRect.width * pixelRatioX;
        const sourceHeight = viewportRect.height * pixelRatioY;

        const destWidth = viewportRect.width;
        const destHeight = viewportRect.height;

        const canvas = document.createElement('canvas');
        canvas.width = viewportRect.width;
        canvas.height = viewportRect.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(
            image,
            sourceX,
            sourceY,
            sourceWidth,
            sourceHeight,
            0,
            0,
            destWidth,
            destHeight,
          );
        }

        canvas.toBlob((blob) => resolve(blob), 'image/png');
      }),
    [imagePosition],
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
    snapImageToCenterIfOutOfBounds();
  }, [snapImageToCenterIfOutOfBounds]);

  useEffect(() => {
    const handleMouseMove = (e) => updateImagePosition(e.clientX, e.clientY);
    const handleTouchMove = (e) =>
      updateImagePosition(e.touches[0].clientX, e.touches[0].clientY);

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

  const handleMouseDown = useCallback(
    (e) => startImageDrag(e.clientX, e.clientY),
    [startImageDrag],
  );

  const handleTouchStart = useCallback(
    (e) => startImageDrag(e.touches[0].clientX, e.touches[0].clientY),
    [startImageDrag],
  );

  const imageStyle = useMemo(
    () => ({
      transform: `translate(${imagePosition.x}px, ${imagePosition.y}px)`,
      width: `${imageWidth}%`,
      transition: !isDragging.current ? 'transform 0.7s ease-in-out' : 'none',
    }),
    [imagePosition, imageWidth],
  );

  return {
    croppingViewportRef,
    positionableImageRef: imageRef,
    positionableImageStyle: imageStyle,
    handlePositionableImageLoad: handleImageLoad,
    isPositionableImageLoaded: isImageLoaded,
    handleMouseDownOnMask: handleMouseDown,
    handleTouchStartOnMask: handleTouchStart,
    adjustZoomOnWheelEvent,
    zoomPercentage,
    updateZoomPercentage,
    cropImage,
  };
};

export default useImageCropper;
