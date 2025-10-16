import React from 'react';
import {
  useAccountInfo,
  useImageLoader,
  useLogout,
  useResponsive,
} from '@/hooks';
import {
  IconContainer,
  MenuItemButton,
  MenuItemLabel,
  MenuItemsContainer,
  NameStyled,
  ProfilePhotoContainer,
  ProfilePhotoStyled,
  ProfileStyled,
  SideBarOverlay,
  SideBarStyled,
  SingleMenuItemButton,
  SingleMenuItemContainer,
} from './styles';
import {
  CloseIcon,
  ContactsIcon,
  LogoutIcon,
  MenuIcon,
  MoonIcon,
  ProfileIcon,
  SettingsIcon,
  SunIcon,
} from '@/components/icons';
import NameInitial from '@/components/NameInitial';
import { toggleTheme, useAppStateStore, useThemeStore } from '@/store';

const SideBar = () => {
  const { isLargeScreen } = useResponsive();

  const openContactsModal = useAppStateStore(
    (state) => state.openContactsModal,
  );

  const openSettingsModal = useAppStateStore(
    (state) => state.openSettingsModal,
  );

  const openProfileModal = useAppStateStore((state) => state.openProfileModal);

  const isSidebarVisible = useAppStateStore((state) => state.isSidebarVisible);
  const hideSidebar = useAppStateStore((state) => state.hideSidebar);
  const toggleSidebar = useAppStateStore((state) => state.toggleSidebar);

  const isVisible = isSidebarVisible;

  const { fullName, nameInitials, photoUrl } = useAccountInfo();

  const logout = useLogout();

  const { handleImageLoad, imageSrc } = useImageLoader(photoUrl);

  const openProfile = () => {
    if (isSidebarVisible) hideSidebar();
    openProfileModal();
  };

  const openSettings = () => {
    if (isSidebarVisible) hideSidebar();
    openSettingsModal();
  };

  const openContacts = () => {
    hideSidebar();
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
    if (e.target === e.currentTarget) hideSidebar();
  };

  return (
    <SideBarOverlay $isVisible={isVisible} onClick={handleOverlayClick}>
      <SideBarStyled $isLargeScreen={isLargeScreen} $isVisible={isVisible}>
        <SingleMenuItemContainer
          $isVisible={isVisible}
          $isLargeScreen={isLargeScreen}
        >
          <SingleMenuItemButton onClick={toggleSidebar}>
            <IconContainer>
              {isVisible ? <CloseIcon /> : <MenuIcon />}
            </IconContainer>
          </SingleMenuItemButton>
        </SingleMenuItemContainer>

        <ProfileStyled $isVisible={isVisible} onClick={openSettings}>
          <ProfilePhotoContainer>
            {imageSrc ? (
              <ProfilePhotoStyled
                src={imageSrc}
                onLoad={handleImageLoad}
                alt="Profile Photo"
              />
            ) : (
              <NameInitial nameInitials={nameInitials} isSmall={true} />
            )}
          </ProfilePhotoContainer>

          <NameStyled>{fullName}</NameStyled>
        </ProfileStyled>

        <MenuItemsContainer
          $isVisible={isVisible}
          $isLargeScreen={isLargeScreen}
        >
          {menuItems.map((item) => (
            <MenuItemButton key={item.label} onClick={item.onClick}>
              <IconContainer>{item.icon}</IconContainer>
              {isVisible && <MenuItemLabel>{item.label}</MenuItemLabel>}
            </MenuItemButton>
          ))}
        </MenuItemsContainer>
      </SideBarStyled>
    </SideBarOverlay>
  );
};

export default SideBar;
