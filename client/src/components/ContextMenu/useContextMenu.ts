import {
  MouseEvent,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { MenuPosition } from './types';

const useContextMenu = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [position, setPosition] = useState<MenuPosition>({
    x: 0,
    y: 0,
    direction: 'right',
  });

  const closeMenu = useCallback(() => setIsVisible(false), []);

  // Standard event handler for opening context menu via right-click
  const handleContextMenu = useCallback((e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const elementRect = e.currentTarget.getBoundingClientRect();
    const isInBound =
      e.clientX > elementRect.left &&
      e.clientX < elementRect.right &&
      e.clientY > elementRect.top &&
      e.clientY < elementRect.bottom;

    if (isInBound) {
      setPosition({
        x: e.clientX,
        y: e.clientY,
        direction: 'right',
      });
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  // Handler for when a dedicated "More" button is clicked to open the menu
  const handleMoreButtonClick = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >((e) => {
    e.stopPropagation();
    e.preventDefault();
    const buttonRect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: buttonRect.right,
      y: buttonRect.top,
      direction: 'left',
    });
    setIsVisible(true);
  }, []);

  // Close context menu when window is resized or document is scrolled
  useEffect(() => {
    if (isVisible) {
      window.addEventListener('resize', closeMenu);
      document.addEventListener('wheel', closeMenu);

      return () => {
        window.removeEventListener('resize', closeMenu);
        document.removeEventListener('wheel', closeMenu);
      };
    }
  }, [isVisible, closeMenu]);

  return {
    handleContextMenu,
    handleMoreButtonClick,
    isContextMenuVisible: isVisible,
    closeContextMenu: closeMenu,
    contextMenuPosition: position,
  };
};

export default useContextMenu;
