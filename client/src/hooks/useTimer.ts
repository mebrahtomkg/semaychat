import { useCallback, useEffect, useRef } from 'react';

const useTimer = () => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const setTimer = useCallback((fn: () => void, ms = 0) => {
    timeoutRef.current = setTimeout(fn, ms);
  }, []);

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    return clearTimer;
  }, [clearTimer]);

  return { setTimer, clearTimer };
};

export default useTimer;
