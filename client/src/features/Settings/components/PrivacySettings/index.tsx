import { FC, RefObject, useCallback, useMemo, useRef, useState } from 'react';
import { SettingsCategoryContainer } from '../../styles';
import { useAccount } from '@/hooks';
import { PRIVACY_SETTINGS } from './constants';
import { ANIMATION_DIALOG_FAST, WithAnimation } from '@/Animation';
import { VISIBILITY_OPTION_LABELS } from '../../constants';
import PrivacyEditor from '../PrivacyEditor';
import { Account, VisibilityOption } from '@/types';
import { IPrivacySetting } from '../../types';
import { addAccountUpdateRequest } from '@/store/useAccountUpdateRequestStore';
import ExpandableSettingsItem from '../ExpandableSettingsItem';

interface PrivacySettingsProps {
  parentModalRef: RefObject<Element | null>;
}

const PrivacySettings: FC<PrivacySettingsProps> = ({ parentModalRef }) => {
  const account = useAccount();
  const dataUpdateRef = useRef<Partial<Account> | null>(null);
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
        <ExpandableSettingsItem
          key={`${setting.title}`}
          title={setting.title}
          description={VISIBILITY_OPTION_LABELS[account[setting.settingkey]]}
          onClick={() => openPrivacyEditor(setting)}
        />
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
              parentModalRef={parentModalRef}
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
