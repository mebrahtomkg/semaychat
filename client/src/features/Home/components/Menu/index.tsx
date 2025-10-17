import React, { CSSProperties, FC } from 'react';
import { useLogout } from '@/hooks';
import {
  IconContainer,
  MenuItemButton,
  MenuItemLabel,
  MenuOverlay,
  MenuStyled,
} from './styles';
import {
  ContactsIcon,
  LogoutIcon,
  MoonIcon,
  ProfileIcon,
  SettingsIcon,
  SunIcon,
} from '@/components/icons';
import { toggleTheme, useAppStateStore, useThemeStore } from '@/store';

interface MenuProps {
  onClose: () => void;
  animationStyle?: CSSProperties;
}

const Menu: FC<MenuProps> = ({ onClose, animationStyle }) => {
  const openContactsModal = useAppStateStore(
    (state) => state.openContactsModal,
  );

  const openSettingsModal = useAppStateStore(
    (state) => state.openSettingsModal,
  );

  const openProfileModal = useAppStateStore((state) => state.openProfileModal);

  const logout = useLogout();

  const openProfile = () => {
    onClose();
    openProfileModal();
  };

  const openSettings = () => {
    onClose();
    openSettingsModal();
  };

  const openContacts = () => {
    onClose();
    openContactsModal();
  };

  const theme = useThemeStore();

  const menuItems = [
    {
      onClick: openContacts,
      icon: <ContactsIcon />,
      label: 'Contacts',
    },
    {
      onClick: openProfile,
      icon: <ProfileIcon />,
      label: 'My Profile',
    },
    {
      onClick: openSettings,
      icon: <SettingsIcon />,
      label: 'Settings',
    },
    {
      onClick: logout,
      icon: <LogoutIcon />,
      label: 'Log out',
    },
    {
      onClick: toggleTheme,
      icon: theme === 'light' ? <MoonIcon /> : <SunIcon />,
      label: 'Theme',
    },
  ];

  const handleOverlayClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <MenuOverlay onClick={handleOverlayClick}>
      <MenuStyled style={animationStyle}>
        {menuItems.map((item) => (
          <MenuItemButton key={item.label} onClick={item.onClick}>
            <IconContainer>{item.icon}</IconContainer>
            <MenuItemLabel>{item.label}</MenuItemLabel>
          </MenuItemButton>
        ))}
      </MenuStyled>
    </MenuOverlay>
  );
};

export default Menu;
