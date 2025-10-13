import { BackButton, CloseButton } from '@/components/buttons';
import { useAccountInfo, useResponsive } from '@/hooks';
import { useState, type CSSProperties, type FC } from 'react';
import ProfilePhotoSettings from './components/ProfilePhotoSettings';
import {
  MainTitle,
  MenuDivider,
  MenuItemButton,
  NavMenu,
  NavMenuContainer,
  SettingsCategoryContainer,
  SettingsPage,
  SettingsPageHeader,
  SettingsPageOverlay,
} from './styles';
import { useAppStateStore } from '@/store';
import PrivacySettings from './components/PrivacySettings';
import NameSettings from './components/NameSettings';
import UsernameSettings from './components/UsernameSettings';
import BioSettings from './components/BioSettings';
import SettingsItem from './components/SettingsItem';
import PasswordSettings from './components/PasswordSettings';
import BlockedUsersSettings from './components/BlockedUsersSettings';

type SettingsCategory = 'account' | 'profilePhoto' | 'security' | 'privacy';

interface SettingsProps {
  animationStyle?: CSSProperties;
}

const Settings: FC<SettingsProps> = ({ animationStyle }) => {
  const { windowWidth } = useResponsive();
  const { email } = useAccountInfo();

  const closeSettingsModal = useAppStateStore(
    (state) => state.closeSettingsModal,
  );

  const [category, setCategory] = useState<SettingsCategory>('profilePhoto');

  return (
    <SettingsPageOverlay style={{ ...animationStyle, transform: undefined }}>
      <SettingsPage style={animationStyle} $windowWidth={windowWidth}>
        {windowWidth > 500 && (
          <SettingsPageHeader>
            <MainTitle>Settings</MainTitle>
            <CloseButton onClick={closeSettingsModal} />
          </SettingsPageHeader>
        )}
        <NavMenuContainer>
          {windowWidth <= 500 && <BackButton onClick={closeSettingsModal} />}
          <NavMenu $windowWidth={windowWidth}>
            <MenuItemButton
              $isActive={category === 'account'}
              onClick={() => setCategory('account')}
            >
              Account
            </MenuItemButton>
            <MenuDivider />

            <MenuItemButton
              $isActive={category === 'profilePhoto'}
              onClick={() => setCategory('profilePhoto')}
            >
              Profile Photo
            </MenuItemButton>
            <MenuDivider />

            <MenuItemButton
              $isActive={category === 'security'}
              onClick={() => setCategory('security')}
            >
              Security
            </MenuItemButton>
            <MenuDivider />

            <MenuItemButton
              $isActive={category === 'privacy'}
              onClick={() => setCategory('privacy')}
            >
              Privacy
            </MenuItemButton>
          </NavMenu>
        </NavMenuContainer>
        {category === 'profilePhoto' && <ProfilePhotoSettings />}
        {category === 'account' && (
          <SettingsCategoryContainer>
            <NameSettings />
            <UsernameSettings />
            <BioSettings />
            <SettingsItem title={email} description="Email" />
          </SettingsCategoryContainer>
        )}
        {category === 'security' && (
          <SettingsCategoryContainer>
            <PasswordSettings />
            <BlockedUsersSettings />
          </SettingsCategoryContainer>
        )}
        {category === 'privacy' && <PrivacySettings />}
      </SettingsPage>
    </SettingsPageOverlay>
  );
};

export default Settings;
