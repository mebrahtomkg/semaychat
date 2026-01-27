import { useEffect, useRef, useState } from 'react';

const isMobileWidth = (width: number) => width < 768; // any screen less than tablet

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(isMobileWidth(window.innerWidth));
  const prevWidthRef = useRef(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const prevWidth = prevWidthRef.current;
      prevWidthRef.current = width;
      const wasMobile = isMobileWidth(prevWidth);
      const _isMobile = isMobileWidth(width);
      // Do state update only if neccessary to avoid unwanted rerender
      if (_isMobile !== wasMobile) setIsMobile(_isMobile);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

export default useIsMobile;
