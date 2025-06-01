import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  useAccount,
  useAnimation,
  useAppContext,
  useImageLoader
} from '@/hooks';
import {
  IconContainer,
  ImageIcon,
  MenuItemButton,
  MenuItemLabel,
  MenuItemsContainer,
  NameStyled,
  ProfilePhotoContainer,
  ProfilePhotoStyled,
  ProfileStyled,
  SideBarOverlay,
  SideBarStyled,
  SidebarToggleButton
} from './styles';
import {
  CloseIcon,
  LogoutIcon,
  NextIcon,
  SettingsIcon
} from '@/components/icons';
import NameInitial from '@/components/NameInitial';
import Settings from '../Settings';
import MenuButton from '@/components/MenuButton';
import { useLocation } from 'react-router';

const SideBar = () => {
  const navigate = useNavigate();

  const { isLargeScreen } = useAppContext();

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
    []
  );

  const isVisible = isSidebarVisible;

  const { fullName, nameInitials, photoUrl, logout } = useAccount();

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
      icon: <ImageIcon src="/icons/user.png" alt="icon" />,
      label: 'Contacts'
    },
    {
      onClick: openSettingsPage,
      icon: <SettingsIcon />,
      label: 'Settings'
    },
    {
      onClick: logout,
      icon: <LogoutIcon />,
      label: 'Log out'
    }
  ];

  const location = useLocation();

  const handleOverlayClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) hideSidebar();
  };

  return (
    <SideBarOverlay $isVisible={isVisible} onClick={handleOverlayClick}>
      {!isLargeScreen && location.pathname === '/' && (
        <MenuButton onClick={showSidebar} />
      )}

      {settingsAnimation.isMounted && (
        <Settings
          onClose={closeSettings}
          animationStyle={settingsAnimation.animationStyle}
        />
      )}

      <SideBarStyled $isLargeScreen={isLargeScreen} $isVisible={isVisible}>
        <SidebarToggleButton onClick={toggleSidebar}>
          {isVisible ? <CloseIcon /> : <NextIcon />}
        </SidebarToggleButton>

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
