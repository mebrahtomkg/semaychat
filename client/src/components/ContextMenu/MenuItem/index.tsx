import React, { FC } from 'react';
import { MenuItemIconContainer, MenuItemLabel, MenuItemStyled } from './styles';

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const MenuItem: FC<MenuItemProps> = ({ icon, label, onClick }) => {
  return (
    <MenuItemStyled role="menuitem" onClick={onClick}>
      <MenuItemIconContainer>{icon}</MenuItemIconContainer>
      <MenuItemLabel>{label}</MenuItemLabel>
    </MenuItemStyled>
  );
};

export default MenuItem;
