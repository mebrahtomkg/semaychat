import { useLayoutEffect, useRef, useState } from 'react';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(true); // Mobile first approch
  const prevWidthRef = useRef(0);

  useLayoutEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const prevWidth = prevWidthRef.current;
      prevWidthRef.current = width;
      const wasMobile = prevWidth < 768;
      const _isMobile = width < 768;
      // Do state update only if neccessary to avoid unwanted rerender
      if (_isMobile !== wasMobile) setIsMobile(_isMobile);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

export default useIsMobile;
