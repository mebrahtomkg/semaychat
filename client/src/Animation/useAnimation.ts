import { CSSProperties, useEffect, useRef, useState, useMemo } from 'react';
import { useStableValue, useTimer } from '@/hooks';
import parseTransition from './parseTransition';
import { AnimationOptions } from './types';

type AnimationStatus = 'entering' | 'exiting' | null;

const useAnimation = (isVisible: boolean, options: AnimationOptions) => {
  // Memoize options object to avoid unnecessary re-renders.
  // Without this technique infinite re-render can happen if the consumer of this hook did
  // not use React.useMemo() to memoize the options object.
  // this updates options object ONLY if it is actually changed(not just reference change)
  const { initialStyles, finalStyles, transition } = useStableValue(options);

  // Parse the duration. Take the max duration from the transition durations
  const duration = useMemo(
    () =>
      Array.isArray(transition.duration)
        ? Math.max(...transition.duration)
        : transition.duration,
    [transition.duration],
  );

  const { setTimer: setUnmountTimer, clearTimer: clearUnmountTimer } =
    useTimer();

  // This cleanup timer is used clear animation style. because animation styles should
  // not stay in the DOM after the animation cycle is complate. eg if we allow transform
  // styles to stay in the DOM, they can cause unexpected behaviors while using styles like
  // position. example `position: fixed` style will not place an element relative to the viewport.
  const { setTimer: setCleanupTimer, clearTimer: clearCleanupTimer } =
    useTimer();

  const [status, setStatus] = useState<AnimationStatus>(
    isVisible ? 'entering' : null,
  );
  const [isMounted, setIsMounted] = useState<boolean>(isVisible);
  const [style, setStyle] = useState<CSSProperties | null>(
    isVisible ? initialStyles : null,
  );
  const isFirstRenderRef = useRef<boolean>(true);

  // Here useEffect is better solution than useLayoutEffect.
  // useLayoutEffect made some components to not animate at entering stage, and
  // maybe it is unresponsive.
  useEffect(() => {
    // If it is first render do nothing, because the states are initialized with
    // expected behavior
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }

    if (isVisible) {
      clearCleanupTimer();
      clearUnmountTimer();
      setStyle(initialStyles);
      setIsMounted(true);
      setStatus('entering');
    } else {
      clearCleanupTimer();
      setStyle(finalStyles);
      setStatus('exiting');
    }
  }, [
    isVisible,
    clearUnmountTimer,
    clearCleanupTimer,
    initialStyles,
    finalStyles,
  ]);

  useEffect(() => {
    clearUnmountTimer();
    switch (status) {
      case 'entering':
        clearCleanupTimer();
        setStyle(finalStyles);
        setCleanupTimer(() => setStyle(null), duration);
        break;

      case 'exiting':
        clearCleanupTimer();
        setStyle(initialStyles);
        setUnmountTimer(() => setIsMounted(false), duration);
        setCleanupTimer(() => setStyle(null), duration);
        break;
    }
  }, [
    clearUnmountTimer,
    status,
    clearCleanupTimer,
    finalStyles,
    setCleanupTimer,
    duration,
    initialStyles,
    setUnmountTimer,
  ]);

  const transitionStyles = useMemo(
    () => parseTransition(transition),
    [transition],
  );

  const animationStyle = useMemo(() => {
    // If style is set to null, make animationStyle undefined. otherwise merge the style
    // with the transitionStyles.
    if (!style) return undefined;
    return { ...style, ...transitionStyles };
  }, [style, transitionStyles]);

  return { isMounted, animationStyle };
};

export default useAnimation;
