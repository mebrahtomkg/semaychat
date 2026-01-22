import { FC, WheelEventHandler } from 'react';
import { SliderProgress, SliderThumb, ZoomSliderTrack } from './styles';
import useZoomSlider from './useZoomSlider';

interface ZoomSliderProps {
  zoomPercentage: number;
  onZoomPercentageUpdate: (percentage: number) => void;
  onWheel: WheelEventHandler;
}

const ZoomSlider: FC<ZoomSliderProps> = ({
  zoomPercentage,
  onZoomPercentageUpdate,
  onWheel,
}) => {
  const {
    trackRef,
    thumbRef,
    handleTrackClick,
    handlePointerDown,
    thumbStyle,
  } = useZoomSlider({ zoomPercentage, onZoomPercentageUpdate });

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
        onMouseDown={handlePointerDown}
        onTouchStart={handlePointerDown}
        style={thumbStyle}
      />
    </ZoomSliderTrack>
  );
};

export default ZoomSlider;
