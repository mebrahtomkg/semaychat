import { useCallback, useMemo, useRef, useState } from 'react';
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
import { VisibilityOption } from '@/types';
import { IPrivacySetting } from '../../types';
import { addAccountUpdateRequest } from '@/store/useAccountUpdateRequestStore';

type DataUpdate = Partial<
  Record<IPrivacySetting['settingkey'], VisibilityOption>
>;

const PrivacySettings = () => {
  const account = useAccount();
  const dataUpdateRef = useRef<DataUpdate | null>(null);
  const [setting, setSetting] = useState<IPrivacySetting | null>(null);
  const [isPrivacyEditorVisible, setIsPrivacyEditorVisible] = useState(false);

  const openPrivacyEditor = useCallback((setting: IPrivacySetting) => {
    setSetting(setting);
    setIsPrivacyEditorVisible(true);
  }, []);

  const closePrivacyEditor = useCallback(
    // setting privacySetting to null is avoided to allow the animation work as expected
    () => setIsPrivacyEditorVisible(false),
    [],
  );

  const handleVisibilitySelect = useCallback(
    (settingkey: IPrivacySetting['settingkey'], value: VisibilityOption) => {
      dataUpdateRef.current = { [settingkey]: value };
      closePrivacyEditor();
    },
    [closePrivacyEditor],
  );

  const doAccountUpdate = useCallback(() => {
    if (dataUpdateRef.current) {
      const data = dataUpdateRef.current;
      dataUpdateRef.current = null;
      addAccountUpdateRequest(data);
    }
  }, []);

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

      {/** setting has always value except at initial. so the animation works well */}
      {setting && (
        <WithAnimation
          isVisible={isPrivacyEditorVisible}
          options={ANIMATION_DIALOG_FAST}
          render={(style) => (
            <PrivacyEditor
              title={setting.title}
              settingkey={setting.settingkey}
              currentValue={account[setting.settingkey]}
              possibleValues={setting.visibilityOptions}
              onSelect={handleVisibilitySelect}
              onClose={closePrivacyEditor}
              animationStyle={style}
            />
          )}
          onUnmount={doAccountUpdate}
        />
      )}
    </SettingsCategoryContainer>
  );
};

export default PrivacySettings;
