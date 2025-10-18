import React, { CSSProperties, FC, ReactNode, useMemo } from 'react';
import {
  IconContainer,
  MenuItemButton,
  MenuItemLabel,
  PopupMenuOverlay,
  PopupMenuStyled,
} from './styles';

export interface PopupMenuItemProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

interface PopupMenuProps {
  menuItems: PopupMenuItemProps[];
  onClose: () => void;
  animationStyle?: CSSProperties;
}

const PopupMenu: FC<PopupMenuProps> = ({
  menuItems,
  onClose,
  animationStyle,
}) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const menuItemComponents = useMemo(
    () =>
      menuItems.map((item) => (
        <MenuItemButton key={item.label} onClick={item.onClick}>
          <IconContainer>{item.icon}</IconContainer>
          <MenuItemLabel>{item.label}</MenuItemLabel>
        </MenuItemButton>
      )),
    [menuItems],
  );

  return (
    <PopupMenuOverlay onClick={handleOverlayClick}>
      <PopupMenuStyled style={animationStyle}>
        {menuItemComponents}
      </PopupMenuStyled>
    </PopupMenuOverlay>
  );
};

export default PopupMenu;
