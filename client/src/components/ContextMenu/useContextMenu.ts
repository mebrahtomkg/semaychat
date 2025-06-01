import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { ContextMenuControlProps } from './types';

interface Position {
  x: number;
  y: number;
}

const useContextMenu = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const menuRef = useRef<HTMLUListElement | null>(null);

  const closeMenu = useCallback(() => setIsVisible(false), []);

  // Standard event handler for opening context menu via right-click
  const onContextMenu = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const elementRect = e.currentTarget.getBoundingClientRect();

    const isInBound =
      e.clientX > elementRect.left &&
      e.clientX < elementRect.right &&
      e.clientY > elementRect.top &&
      e.clientY < elementRect.bottom;

    if (isInBound) {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  // Ref to determine if the "More" button was used to open the menu
  const isMoreButtonUsedRef = useRef<boolean>(false);

  // Handler for when a dedicated "More" button is clicked to open the menu
  const onMoreButtonClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const buttonRect = e.currentTarget.getBoundingClientRect();
    isMoreButtonUsedRef.current = true;
    setPosition({ x: buttonRect.right, y: buttonRect.top });
    setIsVisible(true);
  }, []);

  // Adjust menu position if it overflows the viewport boundaries
  useLayoutEffect(() => {
    if (isMoreButtonUsedRef.current) return;
    if (!isVisible || !menuRef.current) return;
    const menuRect = menuRef.current.getBoundingClientRect();
    setPosition((prevPosition) => {
      let adjustedX = prevPosition.x;
      let adjustedY = prevPosition.y;
      if (menuRect.right > window.innerWidth) {
        adjustedX = window.innerWidth - menuRect.width - 10;
      }
      if (menuRect.bottom > window.innerHeight) {
        adjustedY = window.innerHeight - menuRect.height - 10;
      }
      return { x: adjustedX, y: adjustedY };
    });
  }, [isVisible, position.x, position.y]);

  // Adjust menu position if triggered by the More button: flip it to the left
  useLayoutEffect(() => {
    if (!isVisible || !isMoreButtonUsedRef.current || !menuRef.current) return;
    const menuRect = menuRef.current.getBoundingClientRect();
    isMoreButtonUsedRef.current = false;
    setPosition((prevPosition) => ({
      x: prevPosition.x - menuRect.width,
      y: prevPosition.y
    }));
  }, [isVisible]);

  // Close menu when window is resized or document is scrolled
  useEffect(() => {
    window.addEventListener('resize', closeMenu);
    document.addEventListener('wheel', closeMenu);
    return () => {
      window.removeEventListener('resize', closeMenu);
      document.removeEventListener('wheel', closeMenu);
    };
  }, [closeMenu]);

  const menuStyles = useMemo(
    () => ({ left: `${position.x}px`, top: `${position.y}px` }),
    [position.x, position.y]
  );

  const contextMenuControlProps: ContextMenuControlProps = {
    menuRef,
    menuStyles,
    closeMenu
  };

  return {
    isContextMenuVisible: isVisible,
    onContextMenu,
    onMoreButtonClick,
    contextMenuControlProps
  };
};

export default useContextMenu;
