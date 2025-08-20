import { type CSSProperties, useEffect, useRef, useState } from 'react';
import { useTimer } from '@/hooks';

const DURATION = 200;
const TRANSITION = `opacity ${DURATION}ms ease-in-out, transform ${DURATION}ms ease-in-out`;

const MAX_TRANSITION_DURATION = DURATION; // Max duration used in the css transition in ms

const INITIAL_STYLE = {
  opacity: '0.0',
  transform: 'scale(0.8)',
  transition: TRANSITION,
};

const FINAL_STYLE = {
  opacity: '1.0',
  transform: 'scale(1.0)',
  transition: TRANSITION,
};

type AnimationStatus = 'entering' | 'exiting';

const useAnimation = (isVisible: boolean) => {
  const [status, setStatus] = useState<AnimationStatus | undefined>(
    isVisible ? 'entering' : undefined,
  );
  const [isMounted, setIsMounted] = useState<boolean>(isVisible);
  const [style, setStyle] = useState<CSSProperties | undefined>(INITIAL_STYLE);

  const isFirstRenderRef = useRef<boolean>(true);

  const exitingTimer = useTimer();
  const enteringTimer = useTimer();

  // Here useEffect is better solution than useLayoutEffect.
  // useLayoutEffect made some components to not animate at entering stage, and
  // maybe it is unresponsive.
  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }

    if (isVisible) {
      setStyle(INITIAL_STYLE);
      setIsMounted(true);
      setStatus('entering');
    } else {
      setStyle(FINAL_STYLE);
      setStatus('exiting');
    }
  }, [isVisible]);

  useEffect(() => {
    switch (status) {
      case 'entering':
        setStyle(FINAL_STYLE);
        enteringTimer.setTimer(
          () => setStyle(undefined),
          MAX_TRANSITION_DURATION,
        );
        break;

      case 'exiting':
        setStyle(INITIAL_STYLE);
        exitingTimer.setTimer(
          () => setIsMounted(false),
          MAX_TRANSITION_DURATION,
        );
        break;
    }
  }, [status, enteringTimer.setTimer, exitingTimer.setTimer]);

  return { isMounted, animationStyle: style };
};

export default useAnimation;
