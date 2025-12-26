import { FC, ReactNode, useCallback } from 'react';
import { MenuItemIconContainer, MenuItemLabel, MenuItemStyled } from './styles';

export interface MenuItemProps {
  icon: ReactNode;
  label: string;
  action: () => void;
  onClose: () => void;
}

const MenuItem: FC<MenuItemProps> = ({ icon, label, action, onClose }) => {
  const handleClick = useCallback(() => {
    onClose();
    action();
  }, [onClose, action]);

  return (
    <MenuItemStyled role="menuitem" onClick={handleClick}>
      <MenuItemIconContainer>{icon}</MenuItemIconContainer>
      <MenuItemLabel>{label}</MenuItemLabel>
    </MenuItemStyled>
  );
};

export default MenuItem;
