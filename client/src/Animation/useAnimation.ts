import { CSSProperties, useEffect, useRef, useState, useMemo } from 'react';
import { useTimer } from '@/hooks';
import parseTransition from './parseTransition';
import { AnimationOptions } from './types';
import { deepEqual } from '@/utils';

type AnimationStatus = 'entering' | 'exiting' | null;

const useAnimation = (isVisible: boolean, options: AnimationOptions) => {
  // Memoize options object to avoid unnecessary re-renders.
  // Without this technique infinite re-render can happen if the consumer of this hook did
  // not use React.useMemo() to memoize the options object.
  const optionsRef = useRef(options);

  // Update options object ONLY if it is actually changed(not just reference change)
  if (!deepEqual(options, optionsRef.current)) {
    optionsRef.current = options;
  }

  const { initialStyles, finalStyles, transition } = optionsRef.current;

  const duration = useMemo(
    () =>
      Array.isArray(transition.duration)
        ? Math.max(...transition.duration)
        : transition.duration,
    [transition.duration],
  );

  const { setTimer, clearTimer } = useTimer();

  const [status, setStatus] = useState<AnimationStatus>(
    isVisible ? 'entering' : null,
  );
  const [isMounted, setIsMounted] = useState<boolean>(isVisible);
  const [style, setStyle] = useState<CSSProperties>(initialStyles);
  const isFirstRenderRef = useRef<boolean>(true);

  // Here useEffect is better solution than useLayoutEffect.
  // useLayoutEffect made some components to not animate at entering stage, and
  // maybe it is unresponsive.
  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }

    clearTimer();
    if (isVisible) {
      setStyle(initialStyles);
      setIsMounted(true);
      setStatus('entering');
    } else {
      setStyle(finalStyles);
      setStatus('exiting');
    }
  }, [isVisible, clearTimer, initialStyles, finalStyles]);

  useEffect(() => {
    clearTimer();
    switch (status) {
      case 'entering':
        setStyle(finalStyles);
        break;

      case 'exiting':
        setStyle(initialStyles);
        setTimer(() => setIsMounted(false), duration);
        break;
    }
  }, [status, finalStyles, initialStyles, setTimer, clearTimer, duration]);

  const transitionStyles = useMemo(
    () => parseTransition(transition),
    [transition],
  );

  const animationStyle = useMemo(
    () => ({ ...style, ...transitionStyles }),
    [style, transitionStyles],
  );

  return { isMounted, animationStyle };
};

export default useAnimation;
