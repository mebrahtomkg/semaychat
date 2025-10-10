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
import { PRIVACY_SETTINGS, VISIBILITY_OPTION_LABELS } from './constants';
import { IPrivacySetting } from './types';
import { ANIMATION_DIALOG_FAST, WithAnimation } from '@/Animation';
import PrivacyEditor from './PrivacyEditor';

const PrivacySettings = () => {
  const account = useAccount();

  const [privacySetting, setPrivacySetting] = useState<IPrivacySetting | null>(
    null,
  );

  const [isPrivacyEditorVisible, setIsPrivacyEditorVisible] = useState(false);

  const openPrivacyEditor = useCallback((setting: IPrivacySetting) => {
    setPrivacySetting(setting);
    setIsPrivacyEditorVisible(true);
  }, []);

  const closePrivacyEditor = useCallback(
    // setting privacySetting to null is avoided to allow the animation work as expected
    () => setIsPrivacyEditorVisible(false),
    [],
  );

  const privacySettingsElements = useMemo(
    () =>
      PRIVACY_SETTINGS.map((setting) => (
        <SettingsItemContainer
          key={`${setting.title}`}
          onClick={() => openPrivacyEditor(setting)}
        >
          <div>
            <Title>{setting.title}</Title>
            <Description>
              {VISIBILITY_OPTION_LABELS[account[setting.settingkey]]}
            </Description>
          </div>

          <ArrowIconContainer>
            <NextIcon />
          </ArrowIconContainer>
        </SettingsItemContainer>
      )),
    [account, openPrivacyEditor],
  );

  return (
    <SettingsCategoryContainer>
      {privacySettingsElements}

      {/** privacySetting has always value except at initial. so the animation works well */}
      {privacySetting && (
        <WithAnimation
          isVisible={isPrivacyEditorVisible}
          options={ANIMATION_DIALOG_FAST}
          render={(style) => (
            <PrivacyEditor
              setting={privacySetting}
              onClose={closePrivacyEditor}
              animationStyle={style}
            />
          )}
        />
      )}
    </SettingsCategoryContainer>
  );
};

export default PrivacySettings;
