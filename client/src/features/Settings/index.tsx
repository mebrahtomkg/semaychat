import { BackButton, CloseButton } from '@/components/buttons';
import { NextIcon } from '@/components/icons';
import { useResponsive } from '@/hooks';
import { useMemo, useState, type CSSProperties, type FC } from 'react';
import BioEditor from './components/BioEditor';
import PasswordEditor from './components/PasswordEditor';
import ProfilePhotoSettings from './components/ProfilePhotoSettings';
import {
  ArrowIconContainer,
  Description,
  MainTitle,
  MenuDivider,
  MenuItemButton,
  NavMenu,
  NavMenuContainer,
  SettingsCategoryContainer,
  SettingsItemContainer,
  SettingsPage,
  SettingsPageHeader,
  SettingsPageOverlay,
  Title,
} from './styles';
import useSettings from './useSettings';
import { useAppStateStore } from '@/store';
import BlockedUsers from '../BlockedUsers';
import { ANIMATION_DIALOG_FAST, WithAnimation } from '@/Animation';
import PrivacySettings from './components/PrivacySettings';
import NameSettings from './components/NameSettings';
import UsernameSettings from './components/UsernameSettings';

type SettingsCategory = 'account' | 'profilePhoto' | 'security' | 'privacy';

interface SettingsProps {
  animationStyle?: CSSProperties;
}

const Settings: FC<SettingsProps> = ({ animationStyle }) => {
  const { windowWidth } = useResponsive();

  const closeSettingsModal = useAppStateStore(
    (state) => state.closeSettingsModal,
  );

  const {
    accountSettingsItems,
    securitySettingsItems,
    activeModal,
    closeModal,
  } = useSettings();

  const [category, setCategory] = useState<SettingsCategory>('profilePhoto');

  const accountSettingsElements = useMemo(
    () =>
      accountSettingsItems.map((item, index) => (
        <SettingsItemContainer
          key={`${index}-${item.title}`}
          onClick={item.onClick}
        >
          <div>
            <Title>{item.title}</Title>
            <Description>{item.description}</Description>
          </div>

          <ArrowIconContainer>
            <NextIcon />
          </ArrowIconContainer>
        </SettingsItemContainer>
      )),

    [accountSettingsItems],
  );

  const securitySettingsElements = useMemo(
    () =>
      securitySettingsItems.map((item, index) => (
        <SettingsItemContainer
          key={`${index}-${item.title}`}
          onClick={item.onClick}
        >
          <div>
            <Title>{item.title}</Title>
            <Description>{item.description}</Description>
          </div>

          <ArrowIconContainer>
            <NextIcon />
          </ArrowIconContainer>
        </SettingsItemContainer>
      )),
    [securitySettingsItems],
  );

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
            {accountSettingsElements}
          </SettingsCategoryContainer>
        )}
        {category === 'security' && (
          <SettingsCategoryContainer>
            {securitySettingsElements}
          </SettingsCategoryContainer>
        )}
        {category === 'privacy' && <PrivacySettings />}

        <WithAnimation
          isVisible={activeModal === 'BioEditor'}
          options={ANIMATION_DIALOG_FAST}
          render={(style) => (
            <BioEditor onClose={closeModal} animationStyle={style} />
          )}
        />

        <WithAnimation
          isVisible={activeModal === 'PasswordEditor'}
          options={ANIMATION_DIALOG_FAST}
          render={(style) => (
            <PasswordEditor onClose={closeModal} animationStyle={style} />
          )}
        />

        <WithAnimation
          isVisible={activeModal === 'BlockedUsers'}
          options={ANIMATION_DIALOG_FAST}
          render={(animationStyle) => (
            <BlockedUsers
              onClose={closeModal}
              animationStyle={animationStyle}
            />
          )}
        />
      </SettingsPage>
    </SettingsPageOverlay>
  );
};

export default Settings;
