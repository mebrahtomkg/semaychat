import { useState, useCallback, useMemo } from 'react';

const useZoomController = () => {
  const [zoomPercentage, setZoomPercentage] = useState(0);

  const adjustZoomOnWheelEvent = useCallback(
    (e: WheelEvent) => {
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
    adjustZoomOnWheelEvent,
  };
};

export default useZoomController;
