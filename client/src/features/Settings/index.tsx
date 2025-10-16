import { BackButton } from '@/components/buttons';
import { useState, type CSSProperties, type FC } from 'react';
import {
  NavMenu,
  NavMenuContainer,
  SettingsCategoryContainer,
  SettingsPage,
  SettingsPageOverlay,
} from './styles';
import { useAppStateStore } from '@/store';
import PrivacySettings from './components/PrivacySettings';
import PasswordSettings from './components/PasswordSettings';
import BlockedUsers from './components/BlockedUsers';
import TabButton from './components/TabButton';

type SettingsCategory = 'security' | 'privacy';

interface SettingsProps {
  animationStyle?: CSSProperties;
}

const Settings: FC<SettingsProps> = ({ animationStyle }) => {
  const closeSettingsModal = useAppStateStore(
    (state) => state.closeSettingsModal,
  );

  const [category, setCategory] = useState<SettingsCategory>('security');

  return (
    <SettingsPageOverlay style={{ ...animationStyle, transform: undefined }}>
      <SettingsPage style={animationStyle}>
        <NavMenuContainer>
          <BackButton onClick={closeSettingsModal} />

          <NavMenu>
            <TabButton
              text="Security"
              isActive={category === 'security'}
              onClick={() => setCategory('security')}
            />
            <TabButton
              text="Privacy"
              isActive={category === 'privacy'}
              onClick={() => setCategory('privacy')}
            />
          </NavMenu>
        </NavMenuContainer>

        {category === 'security' && (
          <SettingsCategoryContainer>
            <PasswordSettings />
            <BlockedUsers />
          </SettingsCategoryContainer>
        )}
        {category === 'privacy' && <PrivacySettings />}
      </SettingsPage>
    </SettingsPageOverlay>
  );
};

export default Settings;
