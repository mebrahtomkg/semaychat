import { setWindowWidth } from '@/store';
import { useCallback, useEffect, useLayoutEffect } from 'react';

// Should be called only in the App component.
const useResponsiveController = () => {
  useLayoutEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  const updateWindowWidth = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updateWindowWidth);

    return () => window.removeEventListener('resize', updateWindowWidth);
  }, [updateWindowWidth]);
};

export default useResponsiveController;
