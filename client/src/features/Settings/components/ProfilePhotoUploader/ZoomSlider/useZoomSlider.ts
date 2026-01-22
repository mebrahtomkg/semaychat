import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

interface ZoomSliderOptions {
  zoomPercentage: number;
  onZoomPercentageUpdate: (percentage: number) => void;
}

const useZoomSlider = ({
  zoomPercentage,
  onZoomPercentageUpdate,
}: ZoomSliderOptions) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);
  const [thumbX, setThumbX] = useState<number>(0);
  const isDraggingRef = useRef(false);

  const startDrag = useCallback(() => {
    isDraggingRef.current = true;
  }, []);

  const endDrag = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  const updateZoomPercentage = useCallback(
    (clientX: number) => {
      if (!isDraggingRef.current) return;
      if (!trackRef.current) return;
      const trackRect = trackRef.current.getBoundingClientRect();
      if (clientX > trackRect.left && clientX < trackRect.right) {
        const percentage = ((clientX - trackRect.left) / trackRect.width) * 100;
        onZoomPercentageUpdate(percentage);
      }
      if (clientX <= trackRect.left) onZoomPercentageUpdate(0);
      if (clientX >= trackRect.right) onZoomPercentageUpdate(100);
    },
    [onZoomPercentageUpdate],
  );

  const handleTrackClick: MouseEventHandler = useCallback(
    (e) => {
      if (isDraggingRef.current) return;
      if (!trackRef.current) return;
      const trackRect = trackRef.current.getBoundingClientRect();
      const percentage = ((e.clientX - trackRect.left) / trackRect.width) * 100;
      onZoomPercentageUpdate(percentage);
    },
    [onZoomPercentageUpdate],
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      updateZoomPercentage(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      updateZoomPercentage(e.touches[0].clientX);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseup', endDrag);
      document.removeEventListener('touchend', endDrag);
    };
  }, [updateZoomPercentage, endDrag]);

  useEffect(() => {
    if (!trackRef.current || !thumbRef.current) return;
    const trackWidth = trackRef.current.getBoundingClientRect().width;
    const thumbWidth = thumbRef.current.getBoundingClientRect().width;
    const newThumbX = (zoomPercentage / 100) * trackWidth - thumbWidth / 2;
    setThumbX(Math.round(newThumbX));
  }, [zoomPercentage]);

  const thumbStyle = useMemo(
    () => ({
      transform: `translateX(${thumbX}px)`,
    }),
    [thumbX],
  );

  return {
    trackRef,
    thumbRef,
    handleTrackClick,
    handlePointerDown: startDrag,
    thumbStyle,
  };
};

export default useZoomSlider;
