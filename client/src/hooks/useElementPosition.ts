import {
  CSSProperties,
  RefObject,
  useCallback,
  useEffect,
  useState,
} from 'react';

interface ElementRect {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

type PositionStyle = Required<
  Pick<CSSProperties, 'top' | 'left' | 'right' | 'bottom'>
>;

const parsePositionStyle = ({
  top,
  left,
  right,
  bottom,
}: ElementRect): PositionStyle => ({
  top: `${top}px`,
  left: `${left}px`,
  right: `${window.innerWidth - right}px`,
  bottom: `${window.innerHeight - bottom}px`,
});

const INITIAL_POSITION = parsePositionStyle({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
});

const useElementPosition = (elementRef: RefObject<Element | null>) => {
  const [positionStyle, setPositionStyle] =
    useState<PositionStyle>(INITIAL_POSITION);

  const updatePositionStyle = useCallback(() => {
    const element = elementRef.current;
    if (element) {
      const { top, left, right, bottom } = element.getBoundingClientRect();
      setPositionStyle(parsePositionStyle({ top, left, right, bottom }));
    }
  }, [elementRef.current]);

  useEffect(() => {
    updatePositionStyle();
  }, [updatePositionStyle]);

  useEffect(() => {
    window.addEventListener('resize', updatePositionStyle);
    return () => window.removeEventListener('resize', updatePositionStyle);
  }, [updatePositionStyle]);

  return positionStyle;
};

export default useElementPosition;
