import { useAccountInfo, useImageLoader, useLogout } from '@/hooks';
import {
  HamburgerContainer,
  HamburgerStyled,
  Name,
  NameInitial,
  ProfilePhoto,
  ProfilePhotoContainer,
} from './styles';
import { useCallback, useMemo, useRef, useState } from 'react';
import Menu, { MenuItemProps } from '../Menu';
import { ANIMATION_DIALOG_FAST, WithAnimation } from '@/Animation';
import { toggleTheme, useAppStateStore, useThemeStore } from '@/store';
import {
  ContactsIcon,
  LogoutIcon,
  MoonIcon,
  ProfileIcon,
  SettingsIcon,
  SunIcon,
} from '@/components/icons';

type Action = 'openProfile' | 'openSettings' | 'openContacts';

const Hamburger = () => {
  const { fullName, nameInitials, photoUrl } = useAccountInfo();

  const { imageSrc, handleImageLoad, handleImageLoadError } =
    useImageLoader(photoUrl);

  const action = useRef<Action | null>(null);

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const openMenu = useCallback(() => setIsMenuVisible(true), []);
  const closeMenu = useCallback(() => setIsMenuVisible(false), []);

  const openContactsModal = useAppStateStore((s) => s.openContactsModal);
  const openSettingsModal = useAppStateStore((s) => s.openSettingsModal);
  const openProfileModal = useAppStateStore((s) => s.openProfileModal);
  const theme = useThemeStore();

  const logout = useLogout();

  const openProfile = useCallback(() => {
    action.current = 'openProfile';
    closeMenu();
  }, [closeMenu]);

  const openSettings = useCallback(() => {
    action.current = 'openSettings';
    closeMenu();
  }, [closeMenu]);

  const openContacts = useCallback(() => {
    action.current = 'openContacts';
    closeMenu();
  }, [closeMenu]);

  const runAction = useCallback(() => {
    const actionValue = action.current;
    action.current = null;
    switch (actionValue) {
      case 'openProfile':
        openProfileModal();
        break;

      case 'openSettings':
        openSettingsModal();
        break;

      case 'openContacts':
        openContactsModal();
        break;
    }
  }, [openProfileModal, openSettingsModal, openContactsModal]);

  const menuItems: MenuItemProps[] = useMemo(
    () => [
      { onClick: openContacts, icon: <ContactsIcon />, label: 'Contacts' },
      { onClick: openProfile, icon: <ProfileIcon />, label: 'My Profile' },
      { onClick: openSettings, icon: <SettingsIcon />, label: 'Settings' },
      { onClick: logout, icon: <LogoutIcon />, label: 'Log out' },
      {
        onClick: toggleTheme,
        icon: theme === 'light' ? <MoonIcon /> : <SunIcon />,
        label: 'Theme',
      },
    ],
    [openContacts, openProfile, openSettings, logout, theme],
  );

  return (
    <>
      <HamburgerContainer>
        <HamburgerStyled onClick={openMenu}>
          <ProfilePhotoContainer>
            {imageSrc ? (
              <ProfilePhoto
                src={imageSrc}
                onLoad={handleImageLoad}
                onError={handleImageLoadError}
              />
            ) : (
              <NameInitial>{nameInitials[0]}</NameInitial>
            )}
          </ProfilePhotoContainer>

          <Name>{fullName}</Name>
        </HamburgerStyled>
      </HamburgerContainer>

      <WithAnimation
        isVisible={isMenuVisible}
        options={ANIMATION_DIALOG_FAST}
        render={(style) => (
          <Menu
            menuItems={menuItems}
            onClose={closeMenu}
            animationStyle={style}
          />
        )}
        onUnmount={runAction}
      />
    </>
  );
};

export default Hamburger;
