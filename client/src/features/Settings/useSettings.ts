import { useCallback, useMemo, useState } from 'react';
import { useAccountInfo, useBlockedUsers } from '@/hooks';

type ModalName =
  | 'UsernameEditor'
  | 'NameEditor'
  | 'BioEditor'
  | 'PasswordEditor'
  | 'BlockedUsers';

interface SettingsItem {
  title: string;
  description: string;
  onClick?: () => void;
}

const useSettings = () => {
  const blockedUsers = useBlockedUsers();

  const { email, bio } = useAccountInfo();

  const [activeModal, setActiveModal] = useState<ModalName | null>(null);

  const openModal = useCallback(
    (modalName: ModalName) => setActiveModal(modalName),
    [],
  );

  const closeModal = useCallback(() => setActiveModal(null), []);

  const accountSettingsItems: SettingsItem[] = useMemo(
    () => [
      {
        title: bio ? bio : 'Bio',
        description: bio ? 'Bio' : 'Add a few words about yourself',
        onClick: () => openModal('BioEditor'),
      },
      { title: email || '', description: 'Email', onClick: undefined },
    ],
    [bio, email, openModal],
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
        description: `You blocked ${blockedUsers.length} users`,
        onClick: () => openModal('BlockedUsers'),
      },
    ],
    [openModal, blockedUsers.length],
  );

  return {
    accountSettingsItems,
    securitySettingsItems,
    activeModal,
    closeModal,
  };
};

export default useSettings;
