import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { SliderProgress, SliderThumb, ZoomSliderTrack } from './styles';

interface ZoomSliderProps {
  zoomPercentage: number;
  onZoomPercentageUpdate: (percentage: number) => void;
  onWheel: (e: unknown) => void;
}

const ZoomSlider: FC<ZoomSliderProps> = ({
  zoomPercentage,
  onZoomPercentageUpdate,
  onWheel,
}) => {
  const [thumbX, setThumbX] = useState<number>(0);

  const isDragging = useRef<boolean>(false);

  const trackRef = useRef<HTMLDivElement | null>(null);

  const thumbRef = useRef<HTMLDivElement | null>(null);

  const startThumbDrag = () => {
    isDragging.current = true;
  };

  const updateZoomPercentage = useCallback(
    (clientX: number) => {
      if (!isDragging.current) return;
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

  const handleTrackClick = (e: React.MouseEvent) => {
    if (isDragging.current) return;
    if (!trackRef.current) return;
    const trackRect = trackRef.current.getBoundingClientRect();
    const percentage = ((e.clientX - trackRect.left) / trackRect.width) * 100;
    onZoomPercentageUpdate(percentage);
  };

  const endThumbDrag = useCallback(() => {
    isDragging.current = false;
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => updateZoomPercentage(e.clientX);

    const handleTouchMove = (e: TouchEvent) =>
      updateZoomPercentage(e.touches[0].clientX);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('mouseup', endThumbDrag);
    document.addEventListener('touchend', endThumbDrag);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseup', endThumbDrag);
      document.removeEventListener('touchend', endThumbDrag);
    };
  }, [updateZoomPercentage, endThumbDrag]);

  useEffect(() => {
    if (!trackRef.current || !thumbRef.current) return;
    const trackWidth = trackRef.current.getBoundingClientRect().width;
    const thumbWidth = thumbRef.current.getBoundingClientRect().width;
    const newThumbX = (zoomPercentage / 100) * trackWidth - thumbWidth / 2;
    setThumbX(Math.round(newThumbX));
  }, [zoomPercentage]);

  return (
    <ZoomSliderTrack
      role="slider"
      aria-label="Zoom level slider track"
      aria-valuenow={zoomPercentage}
      aria-valuemin={0}
      aria-valuemax={100}
      onWheel={onWheel}
      draggable="false"
      ref={trackRef}
      onClick={handleTrackClick}
    >
      <SliderProgress draggable="false" />
      <SliderThumb
        aria-label="Slider thumb"
        draggable="false"
        ref={thumbRef}
        onMouseDown={startThumbDrag}
        onTouchStart={startThumbDrag}
        style={{
          transform: `translateX(${thumbX}px)`,
        }}
      />
    </ZoomSliderTrack>
  );
};

export default ZoomSlider;
