import { ElementRect } from '@/types';
import { RefObject, useEffect, useRef } from 'react';

const DEFAULT_RECT = { top: 0, left: 0, right: 0, bottom: 0 };

const useElementRect = (elementRef: RefObject<HTMLElement | null>) => {
  const rectRef = useRef<ElementRect>(DEFAULT_RECT);

  useEffect(() => {
    const element = elementRef.current;
    if (element) {
      const { top, left, right, bottom } = element.getBoundingClientRect();
      rectRef.current = {
        top,
        left,
        right: window.innerWidth - right,
        bottom: window.innerHeight - bottom,
      };
    }
  });

  return rectRef.current || DEFAULT_RECT;
};

export default useElementRect;
