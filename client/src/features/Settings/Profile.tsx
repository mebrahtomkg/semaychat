import { BackButton, CloseButton } from '@/components/buttons';
import { useAccountInfo, useResponsive } from '@/hooks';
import { useState, type CSSProperties, type FC } from 'react';
import ProfilePhotoSettings from './components/ProfilePhotoSettings';
import {
  MainTitle,
  NavMenu,
  NavMenuContainer,
  SettingsCategoryContainer,
  SettingsPage,
  SettingsPageHeader,
  SettingsPageOverlay,
} from './styles';
import { useAppStateStore } from '@/store';
import NameSettings from './components/NameSettings';
import UsernameSettings from './components/UsernameSettings';
import BioSettings from './components/BioSettings';
import SettingsItem from './components/SettingsItem';
import TabButton from './components/TabButton';

type ProfileCategory = 'account' | 'profilePhoto';

interface ProfileProps {
  animationStyle?: CSSProperties;
}

const Profile: FC<ProfileProps> = ({ animationStyle }) => {
  const { windowWidth } = useResponsive();
  const { email } = useAccountInfo();

  const closeProfileModal = useAppStateStore(
    (state) => state.closeProfileModal,
  );

  const [category, setCategory] = useState<ProfileCategory>('profilePhoto');

  return (
    <SettingsPageOverlay style={{ ...animationStyle, transform: undefined }}>
      <SettingsPage style={animationStyle}>
        {windowWidth > 500 && (
          <SettingsPageHeader>
            <MainTitle>Settings</MainTitle>
            <CloseButton onClick={closeProfileModal} />
          </SettingsPageHeader>
        )}
        <NavMenuContainer>
          {windowWidth <= 500 && <BackButton onClick={closeProfileModal} />}
          <NavMenu>
            <TabButton
              text="Profile Photo"
              isActive={category === 'profilePhoto'}
              onClick={() => setCategory('profilePhoto')}
            />
            <TabButton
              text="Account"
              isActive={category === 'account'}
              onClick={() => setCategory('account')}
            />
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
      </SettingsPage>
    </SettingsPageOverlay>
  );
};

export default Profile;
