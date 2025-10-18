import { useLogout } from '@/hooks';
import {
  HamburgerContainer,
  IconContainer,
  MenuItemButton,
  MenuItemLabel,
} from './styles';
import { useCallback, useMemo, useRef, useState } from 'react';
import Menu, { MenuItemProps } from '../Menu';
import { ANIMATION_DIALOG_FAST, WithAnimation } from '@/Animation';
import { toggleTheme, useAppStateStore, useThemeStore } from '@/store';
import {
  ContactsIcon,
  LogoutIcon,
  MenuIcon,
  MoonIcon,
  ProfileIcon,
  SettingsIcon,
  SunIcon,
} from '@/components/icons';

type Action = 'openProfile' | 'openSettings' | 'openContacts';

const Hamburger = () => {
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
    }
  }, [openProfileModal, openSettingsModal]);

  const menuItems: MenuItemProps[] = useMemo(
    () => [
      { onClick: openProfile, icon: <ProfileIcon />, label: 'My Profile' },
      { onClick: openSettings, icon: <SettingsIcon />, label: 'Settings' },
      { onClick: logout, icon: <LogoutIcon />, label: 'Log out' },
    ],
    [openProfile, openSettings, logout],
  );

  return (
    <>
      <HamburgerContainer>
        <MenuItemButton type="button" onClick={openMenu}>
          <IconContainer>
            <MenuIcon />
          </IconContainer>
        </MenuItemButton>

        <MenuItemButton type="button" onClick={openContactsModal}>
          <IconContainer>
            <ContactsIcon />
          </IconContainer>
          <MenuItemLabel>Contacts</MenuItemLabel>
        </MenuItemButton>

        <MenuItemButton type="button" onClick={toggleTheme}>
          <IconContainer>
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </IconContainer>
        </MenuItemButton>
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
