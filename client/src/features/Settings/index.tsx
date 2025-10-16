import { BackButton } from '@/components/buttons';
import { useRef, useState, type CSSProperties, type FC } from 'react';
import {
  NavMenu,
  NavMenuContainer,
  SettingsCategoryContainer,
  SettingsModal,
  SettingsModalOverlay,
} from './styles';
import { useAppStateStore } from '@/store';
import PrivacySettings from './components/PrivacySettings';
import PasswordSettings from './components/PasswordSettings';
import BlockedUsers from './components/BlockedUsers';
import TabButton from './components/TabButton';
import useElementRect from './hooks/useElementRect';

type SettingsCategory = 'security' | 'privacy';

interface SettingsProps {
  animationStyle?: CSSProperties;
}

const Settings: FC<SettingsProps> = ({ animationStyle }) => {
  const settingsModalRef = useRef<HTMLDivElement>(null);

  const settingsModalRect = useElementRect(settingsModalRef);

  const closeSettingsModal = useAppStateStore(
    (state) => state.closeSettingsModal,
  );

  const [category, setCategory] = useState<SettingsCategory>('security');

  return (
    <SettingsModalOverlay style={{ ...animationStyle, transform: undefined }}>
      <SettingsModal ref={settingsModalRef} style={animationStyle}>
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
        {category === 'privacy' && (
          <PrivacySettings parentModalRect={settingsModalRect} />
        )}
      </SettingsModal>
    </SettingsModalOverlay>
  );
};

export default Settings;
