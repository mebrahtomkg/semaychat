import { BackButton, CloseButton } from '@/components/buttons';
import { NextIcon } from '@/components/icons';
import { useResponsive } from '@/hooks';
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
  Title,
} from './styles';
import useSettings from './useSettings';
import { PrivacySetting } from './types';
import { useAppStateStore } from '@/store';
import BlockedUsers from '../BlockedUsers';
import { useAnimation } from '@/Animation';

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
    privacySettingsItems,
    activeModal,
    modalPayload,
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
    [privacySettingsItems],
  );

  const animationOptions = useMemo(
    () => ({
      initialStyles: {
        opacity: 0.5,
        transform: 'scale(0.8)',
      },
      finalStyles: {
        opacity: 1,
        transform: 'scale(1.0)',
      },
      transition: {
        property: ['transform', 'opacity'],
        duration: [200, 200],
        timingFunction: ['ease-in-out', 'ease-in-out'],
      },
    }),
    [],
  );

  const usernameEditorAnimation = useAnimation(
    activeModal === 'UsernameEditor',
    animationOptions,
  );

  const nameEditorAnimation = useAnimation(
    activeModal === 'NameEditor',
    animationOptions,
  );

  const bioEditorAnimation = useAnimation(
    activeModal === 'BioEditor',
    animationOptions,
  );

  const passwordEditorAnimation = useAnimation(
    activeModal === 'PasswordEditor',
    animationOptions,
  );

  const privacyEditorAnimation = useAnimation(
    activeModal === 'PrivacyEditor',
    animationOptions,
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

        <BlockedUsers
          isVisible={activeModal === 'BlockedUsers'}
          onClose={closeModal}
        />

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
