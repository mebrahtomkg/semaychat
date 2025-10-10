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
import { PRIVACY_SETTINGS } from './constants';
import { ANIMATION_DIALOG_FAST, WithAnimation } from '@/Animation';
import { VISIBILITY_OPTION_LABELS } from '../../constants';
import PrivacyEditor from '../PrivacyEditor';

const PrivacySettings = () => {
  const account = useAccount();

  const [privacySetting, setPrivacySetting] = useState<
    (typeof PRIVACY_SETTINGS)[0] | null
  >(null);

  const [isPrivacyEditorVisible, setIsPrivacyEditorVisible] = useState(false);

  const openPrivacyEditor = useCallback((setting: typeof privacySetting) => {
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
              title={privacySetting.title}
              settingkey={privacySetting.settingkey}
              currentValue={account[privacySetting.settingkey]}
              possibleValues={privacySetting.visibilityOptions}
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
