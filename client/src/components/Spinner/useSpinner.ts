import { useTimer } from '@/hooks';
import { useCallback, useRef, useState } from 'react';

const MIN_SPINNER_VISIBLE_TIME = 3000;

const useSpinner = () => {
  const [isSpinnerVisible, setIsSpinnerVisible] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const { setTimer, clearTimer } = useTimer();

  const showSpinner = useCallback(() => {
    clearTimer();
    startTimeRef.current = Date.now();
    setIsSpinnerVisible(true);
  }, [clearTimer]);

  const hideSpinner = useCallback(() => {
    clearTimer();

    if (!startTimeRef.current) {
      return setIsSpinnerVisible(false);
    }

    const elapsedTime = Date.now() - startTimeRef.current;

    if (elapsedTime < MIN_SPINNER_VISIBLE_TIME) {
      const timeLeft = MIN_SPINNER_VISIBLE_TIME - elapsedTime;
      setTimer(() => setIsSpinnerVisible(false), timeLeft);
    }
  }, [clearTimer, setTimer]);

  return {
    isSpinnerVisible,
    showSpinner,
    hideSpinner,
  };
};

export default useSpinner;
