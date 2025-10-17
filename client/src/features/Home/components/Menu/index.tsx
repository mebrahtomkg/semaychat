import React, { CSSProperties, FC, ReactNode, useMemo } from 'react';
import {
  IconContainer,
  MenuItemButton,
  MenuItemLabel,
  MenuOverlay,
  MenuStyled,
} from './styles';

export interface MenuItemProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

interface MenuProps {
  menuItems: MenuItemProps[];
  onClose: () => void;
  animationStyle?: CSSProperties;
}

const Menu: FC<MenuProps> = ({ menuItems, onClose, animationStyle }) => {
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
    <MenuOverlay onClick={handleOverlayClick}>
      <MenuStyled style={animationStyle}>{menuItemComponents}</MenuStyled>
    </MenuOverlay>
  );
};

export default Menu;
