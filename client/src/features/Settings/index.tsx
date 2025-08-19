import { BackButton, CloseButton } from '@/components/buttons';
import { NextIcon } from '@/components/icons';
import { useAnimation, useAppContext } from '@/hooks';
import { useMemo, useState, type CSSProperties, type FC } from 'react';
import BioEditor from './components/BioEditor';
import NameEditor from './components/NameEditor';
import PasswordEditor from './components/PasswordEditor';
import PrivacyEditor from './components/PrivacyEditor';
import ProfilePhotoSettings from './components/ProfilePhotoSettings';
import UsernameEditor from './components/UsernameEditor';
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
  Title
} from './styles';
import useSettings from './useSettings';
import { PrivacySetting } from './types';

type SettingsCategory = 'account' | 'profilePhoto' | 'security' | 'privacy';

interface SettingsProps {
  animationStyle: CSSProperties;
  onClose: () => void;
}

const Settings: FC<SettingsProps> = ({ animationStyle, onClose }) => {
  const { windowWidth } = useAppContext();

  const {
    accountSettingsItems,
    securitySettingsItems,
    privacySettingsItems,
    activeModal,
    modalPayload,
    closeModal
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

    [accountSettingsItems]
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
    [securitySettingsItems]
  );

  const privacySettingsElements = useMemo(
    () =>
      privacySettingsItems.map((item, index) => (
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
    [privacySettingsItems]
  );

  const usernameEditorAnimation = useAnimation(
    activeModal === 'UsernameEditor'
  );

  const nameEditorAnimation = useAnimation(activeModal === 'NameEditor');

  const bioEditorAnimation = useAnimation(activeModal === 'BioEditor');

  const passwordEditorAnimation = useAnimation(
    activeModal === 'PasswordEditor'
  );

  const privacyEditorAnimation = useAnimation(activeModal === 'PrivacyEditor');

  return (
    <SettingsPageOverlay style={{ ...animationStyle, transform: undefined }}>
      <SettingsPage style={animationStyle} $windowWidth={windowWidth}>
        {windowWidth > 500 && (
          <SettingsPageHeader>
            <MainTitle>Settings</MainTitle>
            <CloseButton onClick={onClose} />
          </SettingsPageHeader>
        )}

        <NavMenuContainer>
          {windowWidth <= 500 && <BackButton onClick={onClose} />}
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
            {accountSettingsElements}
          </SettingsCategoryContainer>
        )}

        {category === 'security' && (
          <SettingsCategoryContainer>
            {securitySettingsElements}
          </SettingsCategoryContainer>
        )}

        {category === 'privacy' && (
          <SettingsCategoryContainer>
            {privacySettingsElements}
          </SettingsCategoryContainer>
        )}

        {usernameEditorAnimation.isMounted && (
          <UsernameEditor
            onClose={closeModal}
            animationStyle={usernameEditorAnimation.animationStyle}
          />
        )}

        {nameEditorAnimation.isMounted && (
          <NameEditor
            onClose={closeModal}
            animationStyle={nameEditorAnimation.animationStyle}
          />
        )}

        {bioEditorAnimation.isMounted && (
          <BioEditor
            onClose={closeModal}
            animationStyle={bioEditorAnimation.animationStyle}
          />
        )}

        {passwordEditorAnimation.isMounted && (
          <PasswordEditor
            onClose={closeModal}
            animationStyle={passwordEditorAnimation.animationStyle}
          />
        )}

        {privacyEditorAnimation.isMounted && (
          <PrivacyEditor
            privacySetting={modalPayload as PrivacySetting}
            onClose={closeModal}
            animationStyle={privacyEditorAnimation.animationStyle}
          />
        )}
      </SettingsPage>
    </SettingsPageOverlay>
  );
};

export default Settings;
