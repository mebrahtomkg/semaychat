import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import useDebounce from './useDebounce';

const useResponsive = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useLayoutEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { debounce } = useDebounce();

  const updateWindowWidth = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updateWindowWidth);

    return () => window.removeEventListener('resize', updateWindowWidth);
  }, [updateWindowWidth]);

  return { windowWidth };
};

export default useResponsive;
