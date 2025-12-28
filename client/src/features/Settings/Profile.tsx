import { BackButton } from '@/components/buttons';
import { useAccountInfo } from '@/hooks';
import { useState, type CSSProperties, type FC } from 'react';
import ProfilePhotoSettings from './components/ProfilePhotoSettings';
import {
  NavMenu,
  NavMenuContainer,
  SettingsCategoryContainer,
  SettingsModal,
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
  const { email } = useAccountInfo();

  const closeProfileModal = useAppStateStore(
    (state) => state.closeProfileModal,
  );

  const [category, setCategory] = useState<ProfileCategory>('profilePhoto');

  return (
    <SettingsModal style={animationStyle}>
      <NavMenuContainer>
        <BackButton onClick={closeProfileModal} />

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
          <SettingsItem value={email} label="Email" />
          <BioSettings />
        </SettingsCategoryContainer>
      )}
    </SettingsModal>
  );
};

export default Profile;
