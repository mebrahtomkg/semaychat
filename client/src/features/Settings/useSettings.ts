import { useCallback, useMemo, useState } from 'react';
import { useAccount } from '@/hooks';
import { PRIVACY_SETTINGS_CONFIG, VISIBILITY_OPTION_LABELS } from './constants';
import type { SettingsItem } from './types';

type ModalName =
  | 'UsernameEditor'
  | 'NameEditor'
  | 'BioEditor'
  | 'PasswordEditor'
  | 'PrivacyEditor';

const useSettings = () => {
  const {
    email,
    username,
    bio,
    emailVisibility,
    lastSeenVisibility,
    profilePhotosVisibility,
    messageSender,
    fullName,
  } = useAccount();

  const [activeModal, setActiveModal] = useState<ModalName | null>(null);
  const [modalPayload, setModalPayload] = useState<unknown>(null);

  const openModal = useCallback((modalName: ModalName, payload?: unknown) => {
    setModalPayload(payload);
    setActiveModal(modalName);
  }, []);

  const closeModal = useCallback(() => setActiveModal(null), []);

  const accountSettingsItems: SettingsItem[] = useMemo(
    () => [
      {
        title: username ? `@${username}` : 'Username',
        description: username ? `Click to change username` : 'Click to add username',
        onClick: () => openModal('UsernameEditor'),
      },
      {
        title: fullName,
        description: 'Name',
        onClick: () => openModal('NameEditor'),
      },
      {
        title: bio ? bio : 'Bio',
        description: bio ? 'Bio' : 'Add a few words about yourself',
        onClick: () => openModal('BioEditor'),
      },
      { title: email || '', description: 'Email', onClick: undefined },
    ],
    [bio, email, fullName, openModal, username],
  );

  const securitySettingsItems: SettingsItem[] = useMemo(
    () => [
      {
        title: 'Password',
        description: 'Click to change password',
        onClick: () => openModal('PasswordEditor'),
      },
      {
        title: 'Blocked Users',
        description: 'You blocked 0 users',
        onClick: undefined,
      },
    ],
    [openModal],
  );

  const privacySettingsItems: SettingsItem[] = useMemo(
    () => [
      {
        title: PRIVACY_SETTINGS_CONFIG.emailVisibility.title,
        description: VISIBILITY_OPTION_LABELS[emailVisibility],
        onClick: () => openModal('PrivacyEditor', 'emailVisibility'),
      },
      {
        title: PRIVACY_SETTINGS_CONFIG.lastSeenVisibility.title,
        description: VISIBILITY_OPTION_LABELS[lastSeenVisibility],
        onClick: () => openModal('PrivacyEditor', 'lastSeenVisibility'),
      },
      {
        title: PRIVACY_SETTINGS_CONFIG.profilePhotosVisibility.title,
        description: VISIBILITY_OPTION_LABELS[profilePhotosVisibility],
        onClick: () => openModal('PrivacyEditor', 'profilePhotosVisibility'),
      },
      {
        title: PRIVACY_SETTINGS_CONFIG.messageSender.title,
        description: VISIBILITY_OPTION_LABELS[messageSender],
        onClick: () => openModal('PrivacyEditor', 'messageSender'),
      },
    ],
    [
      emailVisibility,
      lastSeenVisibility,
      messageSender,
      openModal,
      profilePhotosVisibility,
    ],
  );

  return {
    accountSettingsItems,
    securitySettingsItems,
    privacySettingsItems,
    activeModal,
    modalPayload,
    closeModal,
  };
};

export default useSettings;
