import { CSSProperties, FC, ReactNode } from 'react';
import { AnimationOptions } from './types';
import useAnimation from './useAnimation';

interface WithAnimationProps {
  isVisible: boolean;
  options: AnimationOptions;
  render: (animationStyle: CSSProperties) => ReactNode;
}

const WithAnimation: FC<WithAnimationProps> = ({
  isVisible,
  options,
  render,
}) => {
  const { isMounted, animationStyle } = useAnimation(isVisible, options);

  if (!isMounted) return null;

  return render(animationStyle);
};

export default WithAnimation;
