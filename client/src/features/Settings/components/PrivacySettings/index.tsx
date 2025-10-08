import { useCallback, useMemo, useState } from 'react';
import {
  ArrowIconContainer,
  Description,
  SettingsCategoryContainer,
  SettingsItemContainer,
  Title,
} from '../../styles';
import { NextIcon } from '@/components/icons';
import { useAccount } from '@/hooks';
import { useAnimation } from '@/Animation';
import PrivacyEditor from './PrivacyEditor';
import { PRIVACY_SETTINGS, VISIBILITY_OPTION_LABELS } from './constants';
import { IPrivacySetting } from './types';

interface SettingsItem {
  title: string;
  description: string;
  onClick?: () => void;
}

type ModalName = 'PrivacyEditor' | null;

const PrivacySettings = () => {
  const account = useAccount();

  const [activeModal, setActiveModal] = useState<ModalName>(null);
  const [modalPayload, setModalPayload] = useState<unknown>(null);

  const openModal = useCallback((modalName: ModalName, payload?: unknown) => {
    setModalPayload(payload);
    setActiveModal(modalName);
  }, []);

  const closeModal = useCallback(() => setActiveModal(null), []);

  const privacySettingsItems: SettingsItem[] = useMemo(
    () =>
      PRIVACY_SETTINGS.map((privacySetting) => ({
        title: privacySetting.title,
        description:
          VISIBILITY_OPTION_LABELS[account[privacySetting.settingkey]],
        onClick: () => openModal('PrivacyEditor', privacySetting),
      })),
    [openModal, account],
  );

  const privacyEditorAnimation = useAnimation(activeModal === 'PrivacyEditor', {
    initialStyles: { opacity: 0.5, transform: 'scale(0.8)' },
    finalStyles: { opacity: 1, transform: 'scale(1.0)' },
    transition: {
      property: ['transform', 'opacity'],
      duration: [200, 200],
      timingFunction: ['ease-in-out', 'ease-in-out'],
    },
  });

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

  return (
    <SettingsCategoryContainer>
      {privacySettingsElements}

      {privacyEditorAnimation.isMounted && (
        <PrivacyEditor
          privacySetting={modalPayload as IPrivacySetting}
          onClose={closeModal}
          animationStyle={privacyEditorAnimation.animationStyle}
        />
      )}
    </SettingsCategoryContainer>
  );
};

export default PrivacySettings;
