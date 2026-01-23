import {
  useState,
  useCallback,
  useMemo,
  WheelEventHandler,
  TouchEventHandler,
  useEffect,
  useRef,
  Touch,
} from 'react';

interface PinchStartInfo {
  touchDistance: number;
  zoomPercentage: number;
}

const getTouchDistance = (touch1: Touch, touch2: Touch) => {
  const width = Math.abs(touch2.clientX - touch1.clientX);
  const height = Math.abs(touch2.clientY - touch1.clientY);
  return Math.hypot(width, height);
};

const useZoomController = () => {
  const [zoomPercentage, setZoomPercentage] = useState(0);

  const pinchStartInfoRef = useRef<PinchStartInfo>({
    touchDistance: 0,
    zoomPercentage: 0,
  });

  const handleTouchMove = useCallback((e: TouchEvent) => {
    e.preventDefault(); // Stops page scrolling and default page zooming.
    if (e.touches.length < 2) return;
    const pinchStartInfo = pinchStartInfoRef.current;
    const touchDistance = getTouchDistance(e.touches[0], e.touches[1]);
    const pinchChange = touchDistance - pinchStartInfo.touchDistance;
    const sensitivity = 0.25;
    const newZoomPercentage = Math.max(
      0,
      Math.min(100, pinchStartInfo.zoomPercentage + pinchChange * sensitivity),
    );
    setZoomPercentage(newZoomPercentage);
  }, []);

  const handleTouchStart: TouchEventHandler = useCallback(
    (e) => {
      if (e.touches.length < 2) return;
      const touchDistance = getTouchDistance(e.touches[0], e.touches[1]);
      pinchStartInfoRef.current = { touchDistance, zoomPercentage };
      document.addEventListener('touchmove', handleTouchMove, {
        passive: false,
      });
    },
    [zoomPercentage, handleTouchMove],
  );

  const handleTouchEnd = useCallback(() => {
    document.removeEventListener('touchmove', handleTouchMove);
  }, [handleTouchMove]);

  useEffect(() => {
    document.addEventListener('touchend', handleTouchEnd);
    return () => {
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchEnd]);

  useEffect(() => {
    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handleTouchMove]);

  const handleWheel: WheelEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      const direction = e.deltaY < 0 ? 1 : -1;
      const step = 5 * direction;
      const newZoomPercentage = Math.max(
        0,
        Math.min(100, zoomPercentage + step),
      );
      setZoomPercentage(newZoomPercentage);
    },
    [zoomPercentage],
  );

  const imageWidth = useMemo(() => {
    return 100 + zoomPercentage * 2;
  }, [zoomPercentage]);

  return {
    imageWidth,
    zoomPercentage,
    updateZoomPercentage: setZoomPercentage,
    handleWheel,
    handleTouchStart,
  };
};

export default useZoomController;
