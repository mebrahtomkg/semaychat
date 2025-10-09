import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowIconContainer,
  Description,
  SettingsCategoryContainer,
  SettingsItemContainer,
  Title,
} from '../../styles';
import { NextIcon } from '@/components/icons';
import { useAccount, useTimer, useUpdateAccount } from '@/hooks';
import { PRIVACY_SETTINGS, VISIBILITY_OPTION_LABELS } from './constants';
import { IPrivacySetting } from './types';
import RadioGroup from '../RadioGroup';

interface SettingsItem {
  title: string;
  description: string;
  onClick?: () => void;
}

const PrivacySettings = () => {
  const account = useAccount();
  const { updateAccount } = useUpdateAccount();

  const [isRadioGroupVisible, setIsRadioGroupVisible] = useState(false);
  const openRadioGroup = useCallback(() => setIsRadioGroupVisible(true), []);
  const closeRadioGroup = useCallback(() => setIsRadioGroupVisible(false), []);

  const [privacySetting, setPrivacySetting] = useState<IPrivacySetting | null>(
    null,
  );

  const privacySettingsItems: SettingsItem[] = useMemo(
    () =>
      PRIVACY_SETTINGS.map((privacySetting) => ({
        title: privacySetting.title,
        description:
          VISIBILITY_OPTION_LABELS[account[privacySetting.settingkey]],
        onClick: () => {
          setPrivacySetting(privacySetting);
          openRadioGroup();
        },
      })),
    [account, openRadioGroup],
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

  const { setTimer } = useTimer();

  const handleSelect = useCallback(
    async (name: string, value: string) => {
      closeRadioGroup();
      await new Promise<void>((resolve) => {
        setTimer(() => {
          updateAccount({ [name]: value });
          resolve();
        }, 500);
      });
    },
    [closeRadioGroup, setTimer, updateAccount],
  );

  return (
    <SettingsCategoryContainer>
      {privacySettingsElements}

      <RadioGroup
        isVisible={isRadioGroupVisible}
        title={privacySetting?.title}
        name={privacySetting?.settingkey}
        value={account[privacySetting?.settingkey]}
        options={privacySetting?.visibilityOptions.map((vp) => ({
          label: VISIBILITY_OPTION_LABELS[vp],
          value: vp,
        }))}
        onSelect={handleSelect}
        onClose={closeRadioGroup}
      />
    </SettingsCategoryContainer>
  );
};

export default PrivacySettings;
