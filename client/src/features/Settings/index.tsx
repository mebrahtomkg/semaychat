import { BackButton } from '@/components/buttons';
import { useRef, useState, type CSSProperties, type FC } from 'react';
import {
  NavMenuContainer,
  SettingsCategoryContainer,
  SettingsModal,
  TabbedMenu,
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
  const settingsModalRef = useRef<HTMLDivElement>(null);

  const closeSettingsModal = useAppStateStore(
    (state) => state.closeSettingsModal,
  );

  const [category, setCategory] = useState<SettingsCategory>('security');

  return (
    <SettingsModal ref={settingsModalRef} style={animationStyle}>
      <NavMenuContainer>
        <BackButton onClick={closeSettingsModal} />

        <TabbedMenu>
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
        </TabbedMenu>
      </NavMenuContainer>

      {category === 'security' && (
        <SettingsCategoryContainer>
          <PasswordSettings />
          <BlockedUsers />
        </SettingsCategoryContainer>
      )}
      {category === 'privacy' && (
        <PrivacySettings parentModalRef={settingsModalRef} />
      )}
    </SettingsModal>
  );
};

export default Settings;
