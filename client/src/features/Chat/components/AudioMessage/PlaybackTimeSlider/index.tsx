import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import {
  PlaybackTimeSliderStyled,
  SliderProgress,
  SliderThumb,
  SliderTrack
} from './styles';

interface PlaybackTimeSliderProps {
  timePercentage: number;
  onTimePercentageUpdate: (percentage: number) => void;
}

const PlaybackTimeSlider: FC<PlaybackTimeSliderProps> = ({
  timePercentage,
  onTimePercentageUpdate
}) => {
  const isDragging = useRef<boolean>(false);

  const trackRef = useRef<HTMLDivElement>(null);

  const startThumbDrag = useCallback(() => {
    isDragging.current = true;
  }, []);

  const updateTimePercentage = useCallback(
    (clientX: number) => {
      if (!isDragging.current) return;
      if (!trackRef.current) return;
      const trackRect = trackRef.current.getBoundingClientRect();
      if (clientX > trackRect.left && clientX < trackRect.right) {
        const percentage = ((clientX - trackRect.left) / trackRect.width) * 100;
        onTimePercentageUpdate(percentage);
      }
      if (clientX <= trackRect.left) onTimePercentageUpdate(0);
      if (clientX >= trackRect.right) onTimePercentageUpdate(100);
    },
    [onTimePercentageUpdate]
  );

  const handleSliderClick = useCallback(
    (e) => {
      if (isDragging.current) return;
      if (!trackRef.current) return;
      const trackRect = trackRef.current.getBoundingClientRect();
      const percentage = ((e.clientX - trackRect.left) / trackRect.width) * 100;
      onTimePercentageUpdate(percentage);
    },
    [onTimePercentageUpdate]
  );

  const endThumbDrag = useCallback(() => {
    isDragging.current = false;
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => updateTimePercentage(e.clientX);
    const handleTouchMove = (e) => updateTimePercentage(e.touches[0].clientX);

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
  }, [endThumbDrag, updateTimePercentage]);

  const sliderProgressStyle = useMemo(
    () => ({ width: `${timePercentage}%` }),
    [timePercentage]
  );

  return (
    <PlaybackTimeSliderStyled
      role="slider"
      aria-label="Audio playback time slider track"
      aria-valuenow={timePercentage}
      aria-valuemin={0}
      aria-valuemax={100}
      onWheel={() => undefined}
      draggable="false"
      onClick={handleSliderClick}
    >
      <SliderTrack draggable="false" ref={trackRef}>
        <SliderProgress draggable="false" style={sliderProgressStyle}>
          <SliderThumb
            aria-label="Slider thumb"
            draggable="false"
            onMouseDown={startThumbDrag}
            onTouchStart={startThumbDrag}
          />
        </SliderProgress>
      </SliderTrack>
    </PlaybackTimeSliderStyled>
  );
};

export default PlaybackTimeSlider;
