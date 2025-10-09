import { AnimationOptions } from './types';

export const MODAL_ANIMATION_OPTIONS: AnimationOptions = {
  initialStyles: { opacity: 0, transform: 'scale(0.8)' },
  finalStyles: { opacity: 1, transform: 'scale(1.0)' },
  transition: {
    property: ['transform', 'opacity'],
    duration: [300, 300],
    timingFunction: ['ease-in-out', 'ease-in-out'],
  },
};

export const FAST_DIALOG_OPTIONS: AnimationOptions = {
  initialStyles: {
    opacity: 0,
    transform: 'translateY(10px)', // Start slightly below center
  },
  finalStyles: {
    opacity: 1,
    transform: 'translateY(0)',
  },
  transition: {
    property: ['transform', 'opacity'],
    duration: [200, 200],
    timingFunction: ['ease-out', 'ease-out'],
  },
};

export const SUBSTANTIAL_MODAL_OPTIONS: AnimationOptions = {
  initialStyles: {
    opacity: 0,
    transform: 'scale(0.95)',
  },
  finalStyles: {
    opacity: 1,
    transform: 'scale(1.0)',
  },
  transition: {
    property: ['transform', 'opacity'],
    duration: [400, 400],
    // A custom bezier curve for a smooth, slightly exaggerated deceleration
    timingFunction: ['cubic-bezier(0.25, 0.46, 0.45, 0.94)', 'ease-in-out'],
  },
};

export const SUBTLE_FADE_OPTIONS: AnimationOptions = {
  initialStyles: {
    opacity: 0,
    // Minimal or no transform for a subtle effect
    transform: 'scale(1.0)',
  },
  finalStyles: {
    opacity: 1,
    transform: 'scale(1.0)',
  },
  transition: {
    property: ['opacity'],
    duration: [150],
    timingFunction: ['linear'],
  },
};
