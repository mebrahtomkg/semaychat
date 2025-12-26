import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { MenuPosition } from './types';

const useMenuPositionFixer = (initialPosition: MenuPosition) => {
  const [position, setPosition] = useState<MenuPosition>(initialPosition);

  const menuRef = useRef<HTMLUListElement | null>(null);

  useLayoutEffect(() => {
    setPosition({
      x: initialPosition.x,
      y: initialPosition.y,
      direction: initialPosition.direction,
    });

    // Use primitive dependencies to avoid unnecessary re-render from object reference change
  }, [initialPosition.x, initialPosition.y, initialPosition.direction]);

  // Adjust menu position if it overflows the viewport boundaries.
  // Flip it to the left if direction is left.
  useLayoutEffect(() => {
    if (!menuRef.current) return;
    const menuRect = menuRef.current.getBoundingClientRect();

    let x = position.x;
    let y = position.y;
    let direction = position.direction;

    // Fix overflow X. but only if direction is 'right'. because we will
    // do flip to left if direction is 'left'
    if (direction === 'right' && menuRect.right > window.innerWidth) {
      x = window.innerWidth - menuRect.width - 10;
    }

    // Fix overflow Y
    if (menuRect.bottom > window.innerHeight) {
      y = window.innerHeight - menuRect.height - 10;
    }

    if (direction === 'left') {
      // Adjust menu position if the intended direction was to the left of x
      // (eg. if triggered by the More button): flip it to the left
      // Note: We must also set direction 'right'. Since we flipped it to the left,
      x = position.x - menuRect.width;
      direction = 'right';
    }

    setPosition({ x, y, direction });
  }, [position.x, position.y, position.direction]);

  const positionStyle = useMemo(
    () => ({
      left: `${position.x}px`,
      top: `${position.y}px`,
    }),
    [position.x, position.y],
  );

  return { menuRef, positionStyle };
};

export default useMenuPositionFixer;
