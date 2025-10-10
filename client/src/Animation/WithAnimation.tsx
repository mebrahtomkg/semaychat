import { CSSProperties, FC, ReactNode, useEffect } from 'react';
import { AnimationOptions } from './types';
import useAnimation from './useAnimation';

interface WithAnimationProps {
  isVisible: boolean;
  options: AnimationOptions;
  render: (animationStyle: CSSProperties) => ReactNode;
  onUnmount?: () => void;
}

const WithAnimation: FC<WithAnimationProps> = ({
  isVisible,
  options,
  render,
  onUnmount,
}) => {
  const { isMounted, animationStyle } = useAnimation(isVisible, options);

  useEffect(() => {
    if (onUnmount && !isMounted) {
      onUnmount();
    }
  }, [onUnmount, isMounted]);

  if (!isMounted) return null;

  return render(animationStyle);
};

export default WithAnimation;
