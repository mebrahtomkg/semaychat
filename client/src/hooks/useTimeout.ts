import { useState, useEffect } from 'react';
import useTimer from './useTimer';

/**
 * A low-level custom hook that tracks the lifecycle of a specific duration.
 *
 * @param ms - The duration in milliseconds.
 * @returns An object containing the explicit status of the timeout.
 */
const useTimeout = (ms: number) => {
  const [isTimeoutElapsed, setIsTimeoutElapsed] = useState(false);
  const { setTimer } = useTimer();

  useEffect(() => {
    setTimer(() => {
      setIsTimeoutElapsed(true);
    }, ms);
  }, [ms, setTimer]);

  return {
    isTimeoutElapsed,
    isTimeoutPending: !isTimeoutElapsed,
  };
};

export default useTimeout;
