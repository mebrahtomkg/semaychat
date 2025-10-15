import { BackButton, CloseButton } from '@/components/buttons';
import { useResponsive } from '@/hooks';
import { useState, type CSSProperties, type FC } from 'react';
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
import PrivacySettings from './components/PrivacySettings';
import PasswordSettings from './components/PasswordSettings';
import BlockedUsers from './components/BlockedUsers';
import TabButton from './components/TabButton';

type SettingsCategory = 'security' | 'privacy';

interface SettingsProps {
  animationStyle?: CSSProperties;
}

const Settings: FC<SettingsProps> = ({ animationStyle }) => {
  const { windowWidth } = useResponsive();

  const closeSettingsModal = useAppStateStore(
    (state) => state.closeSettingsModal,
  );

  const [category, setCategory] = useState<SettingsCategory>('security');

  return (
    <SettingsPageOverlay style={{ ...animationStyle, transform: undefined }}>
      <SettingsPage style={animationStyle}>
        {windowWidth > 500 && (
          <SettingsPageHeader>
            <MainTitle>Settings</MainTitle>
            <CloseButton onClick={closeSettingsModal} />
          </SettingsPageHeader>
        )}
        <NavMenuContainer>
          {windowWidth <= 500 && <BackButton onClick={closeSettingsModal} />}
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
