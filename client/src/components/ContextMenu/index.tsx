import {
  CSSProperties,
  FC,
  MouseEvent,
  ReactElement,
  useCallback,
  useMemo,
} from 'react';
import { ContextMenuOverlay, ContextMenuStyled } from './styles';
import { MenuItemProps } from './MenuItem';
import useMenuPositionFixer from './useMenuPositionFixer';
import { MenuPosition } from './types';

export { default as useContextMenu } from './useContextMenu';
export { default as MenuItem } from './MenuItem';
export type IMenuItem = ReactElement<MenuItemProps>;

interface ContextMenuProps {
  menuItems: IMenuItem[];
  position: MenuPosition;
  onClose: () => void;
  animationStyle?: CSSProperties;
}

const ContextMenu: FC<ContextMenuProps> = ({
  menuItems,
  position,
  onClose,
  animationStyle = {},
}) => {
  const { menuRef, positionStyle } = useMenuPositionFixer(position);

  const menuStyle = useMemo(
    () => ({
      ...positionStyle,
      ...animationStyle,
    }),
    [positionStyle, animationStyle],
  );

  const handleOverlayClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      e.preventDefault();
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  return (
    <ContextMenuOverlay onClick={handleOverlayClick}>
      <ContextMenuStyled
        ref={menuRef}
        role="menu"
        onContextMenu={(e) => e.stopPropagation()}
        style={menuStyle}
      >
        {menuItems}
      </ContextMenuStyled>
    </ContextMenuOverlay>
  );
};

export default ContextMenu;
