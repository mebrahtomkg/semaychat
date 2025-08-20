import { useCallback } from 'react';
import useTimer from './useTimer';

const useDebounce = () => {
  const { setTimer, clearTimer } = useTimer();

  const debounce = useCallback(
    (fn: () => void, ms = 0) => {
      clearTimer();
      setTimer(fn, ms);
    },
    [clearTimer, setTimer],
  );

  return { debounce };
};

export default useDebounce;
