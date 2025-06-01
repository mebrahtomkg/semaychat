import React, { FC, useCallback, useMemo } from 'react';
import { ContextMenuOverlay, ContextMenuStyled } from './styles';
import MenuItem from './MenuItem';
import { ContextMenuControlProps, MenuItemDescriptor } from './types';

export { default as useContextMenu } from './useContextMenu';

interface ContextMenuProps {
  menuItems: MenuItemDescriptor[];
  controlProps: ContextMenuControlProps;
}

const ContextMenu: FC<ContextMenuProps> = ({ menuItems, controlProps }) => {
  const { closeMenu, menuRef, menuStyles } = controlProps;

  const executeMenuItemAction = useCallback(
    (action: MenuItemDescriptor['action']) => {
      closeMenu();
      action();
    },
    [closeMenu]
  );

  const menuList = useMemo(
    () =>
      menuItems.map((menuItem, index) => (
        <MenuItem
          key={`${menuItem.label}-${index}`}
          icon={menuItem.icon}
          label={menuItem.label}
          onClick={() => executeMenuItemAction(menuItem.action)}
        />
      )),
    [menuItems, executeMenuItemAction]
  );

  const handleOverlayClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) closeMenu();
  };

  return (
    <ContextMenuOverlay onClick={handleOverlayClick}>
      <ContextMenuStyled
        ref={menuRef}
        role="menu"
        onContextMenu={(e) => e.stopPropagation()}
        style={menuStyles}
      >
        {menuList}
      </ContextMenuStyled>
    </ContextMenuOverlay>
  );
};

export default ContextMenu;
