import React, { useCallback, useState } from 'react';
import {
  useAccountInfo,
  useAnimation,
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
  SettingsIcon,
  SunIcon,
} from '@/components/icons';
import NameInitial from '@/components/NameInitial';
import Settings from '../Settings';
import { toggleTheme, useAppStateStore, useThemeStore } from '@/store';

const SideBar = () => {
  const { isLargeScreen } = useResponsive();

  const openContactsModal = useAppStateStore(
    (state) => state.openContactsModal,
  );

  const isSidebarVisible = useAppStateStore((state) => state.isSidebarVisible);
  const hideSidebar = useAppStateStore((state) => state.hideSidebar);
  const toggleSidebar = useAppStateStore((state) => state.toggleSidebar);

  const isVisible = isSidebarVisible;

  const { fullName, nameInitials, photoUrl } = useAccountInfo();

  const logout = useLogout();

  const { handleImageLoad, imageSrc } = useImageLoader(photoUrl);

  // Rendering Settings page here in Sidebar component make the opening and closing of
  // Settings page faster and responsive, because the whole app's components do not rerender.
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const openSettings = useCallback(() => setIsSettingsVisible(true), []);
  const closeSettings = useCallback(() => setIsSettingsVisible(false), []);
  const settingsAnimation = useAnimation(isSettingsVisible);

  const openSettingsPage = () => {
    if (isSidebarVisible) hideSidebar();
    openSettings();
  };

  const navigateToContacts = () => {
    hideSidebar();
    openContactsModal();
  };

  const theme = useThemeStore();

  const menuItems = [
    {
      onClick: navigateToContacts,
      icon: <ContactsIcon />,
      label: 'Contacts',
    },
    {
      onClick: openSettingsPage,
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
      {settingsAnimation.isMounted && (
        <Settings
          onClose={closeSettings}
          animationStyle={settingsAnimation.animationStyle}
        />
      )}

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

        <ProfileStyled $isVisible={isVisible} onClick={openSettingsPage}>
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
