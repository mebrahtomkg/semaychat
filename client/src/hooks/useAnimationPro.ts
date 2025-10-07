import {
  type CSSProperties,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import { useTimer } from '@/hooks';

type CSSPropertyName = keyof CSSProperties;

interface Transition {
  property: CSSPropertyName | CSSPropertyName[];
  duration: number | number[];
  timingFunction?: string | string[];
  delay?: number | number[];
}

export interface AnimationOptions {
  initialStyles: CSSProperties;
  finalStyles: CSSProperties;
  transition: Transition;
}

const parseTransition = (transition: Transition): CSSProperties => {
  const { property, duration, timingFunction, delay } = transition;

  return {
    transitionProperty: Array.isArray(property) ? property.join(',') : property,

    transitionDuration: Array.isArray(duration)
      ? duration.map((item) => `${item}ms`).join(',')
      : `${duration}ms`,

    transitionTimingFunction: Array.isArray(timingFunction)
      ? timingFunction.join(',')
      : timingFunction,

    transitionDelay: Array.isArray(delay)
      ? delay.map((item) => `${item}ms`).join(',')
      : delay
        ? `${delay}ms`
        : undefined,
  };
};

type AnimationStatus = 'entering' | 'exiting' | 'at-rest';

const useAnimationPro = (
  isVisible: boolean,
  { initialStyles, finalStyles, transition }: AnimationOptions,
) => {
  const [status, setStatus] = useState<AnimationStatus>(
    isVisible ? 'entering' : 'at-rest',
  );

  const [isMounted, setIsMounted] = useState<boolean>(isVisible);
  const [style, setStyle] = useState<CSSProperties>(initialStyles);
  const isFirstRenderRef = useRef<boolean>(true);

  const duration = useMemo(
    () =>
      Array.isArray(transition.duration)
        ? Math.max(...transition.duration)
        : transition.duration,
    [transition.duration],
  );

  const { setTimer: setEnteringTimer, clearTimer: clearEnteringTimer } =
    useTimer();

  const { setTimer: setExitingTimer, clearTimer: clearExitingTimer } =
    useTimer();

  // Here useEffect is better solution than useLayoutEffect.
  // useLayoutEffect made some components to not animate at entering stage, and
  // maybe it is unresponsive.
  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }

    if (isVisible) {
      setStyle(initialStyles);
      setIsMounted(true);
      setStatus('entering');
    } else {
      setStyle(finalStyles);
      setStatus('exiting');
    }
  }, [isVisible, initialStyles, finalStyles]);

  useEffect(() => {
    switch (status) {
      case 'entering':
        setStyle(finalStyles);
        break;

      case 'exiting':
        setStyle(initialStyles);
        setExitingTimer(() => setIsMounted(false), duration);
        break;
    }
  }, [status, finalStyles, initialStyles, setExitingTimer, duration]);

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

export default useAnimationPro;
