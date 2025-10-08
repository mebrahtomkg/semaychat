import { CSSProperties } from 'react';
import { Transition } from './types';

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

export default parseTransition;
