import { CSSProperties } from 'react';

type CSSPropertyName = keyof CSSProperties;

export type TimingFunction =
  | 'ease'
  | 'linear'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'step-start'
  | 'step-end'
  | `steps(${number}, ${'start' | 'end'})`
  | `cubic-bezier(${number}, ${number}, ${number}, ${number})`;

export interface Transition {
  property: CSSPropertyName | CSSPropertyName[];
  duration: number | number[];
  timingFunction?: TimingFunction | TimingFunction[];
  delay?: number | number[];
}

export interface AnimationOptions {
  initialStyles: CSSProperties;
  finalStyles: CSSProperties;
  transition: Transition;
}
