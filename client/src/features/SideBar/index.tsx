import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  useAccountInfo,
  useAnimation,
  useImageLoader,
  useLogout,
  useResponsive,
} from '@/hooks';
import {
  IconContainer,
  MenuButton,
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
  SettingsIcon,
} from '@/components/icons';
import NameInitial from '@/components/NameInitial';
import Settings from '../Settings';
import { useLocation } from 'react-router';

const SideBar = () => {
  const navigate = useNavigate();

  const { isLargeScreen } = useResponsive();

  // Letting Sidebar component control its visibilty make it faster opening and closing
  // sidebar. using app context to control its visibility make it slow.
  // The menu button that opens it in small screen device is rendered here to access the
  // showSidebar callback. it is styled in fixed position so that it will be visible at
  // the exact place it needed. it is also only visible on '/' route.
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const showSidebar = useCallback(() => setIsSidebarVisible(true), []);
  const hideSidebar = useCallback(() => setIsSidebarVisible(false), []);
  const toggleSidebar = useCallback(
    () => setIsSidebarVisible((prevValue) => !prevValue),
    [],
  );

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
    navigate('/chat/2');
  };

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
  ];

  const location = useLocation();

  const handleOverlayClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) hideSidebar();
  };

  return (
    <SideBarOverlay $isVisible={isVisible} onClick={handleOverlayClick}>
      {!isLargeScreen && location.pathname === '/' && (
        <MenuButton onClick={showSidebar}>
          <MenuIcon />
        </MenuButton>
      )}

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
