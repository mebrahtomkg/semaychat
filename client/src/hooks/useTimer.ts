import { useCallback, useEffect, useRef } from 'react';

/**
 * A custom hook for managing a single `setTimeout` instance safely within a component's lifecycle.
 *
 * This hook ensures that timers are properly cleared when the component unmounts,
 * preventing memory leaks and attempts to execute callbacks on unmounted components.
 *
 * It provides stable functions (`setTimer` and `clearTimer`) via `useCallback`,
 * making them safe to use as dependencies in other hooks.
 *
 * @returns An object containing:
 *          - setTimer: Function to set a new timeout. Accepts a callback function (fn) and
 *                      an optional delay (ms, defaults to 0).
 *          - clearTimer: Function to clear the currently active timeout.
 */
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
