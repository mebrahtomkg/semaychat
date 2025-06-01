import React, { CSSProperties, type FC, useState } from 'react';
import Spinner from '../../../../components/spinner';
import { useAppSelector } from '../../../../hooks';
import {
  PRIVACY_SETTINGS_CONFIG,
  VISIBILITY_OPTION_LABELS,
} from '../../constants';
import useAccountUpdater from '../../hooks/useAccountUpdater';
import type { PrivacySettingConfigItem } from '../../types';
import EditorModal from '../EditorModal';
import RadioButton from '../RadioButton';
import { VisibilityChoicesContainer } from './styles';

interface PrivacyEditorProps {
  settingKey: string;
  animationStyle: CSSProperties;
  onClose: () => void;
}

const PrivacyEditor: FC<PrivacyEditorProps> = ({
  settingKey,
  animationStyle,
  onClose,
}) => {
  const { title, visibilityChoices }: PrivacySettingConfigItem =
    PRIVACY_SETTINGS_CONFIG[settingKey];

  const account = useAppSelector((state) => state.account);
  if (!account) throw new Error('Invalid account!');

  const [value, setValue] = useState(account[settingKey]);

  const handleValueChange = (e) => setValue(e.target.dataset.value);

  const { updateAccount, isUpdating } = useAccountUpdater();

  const updateSetting = async () => {
    const { success, message } = await updateAccount({
      [settingKey]: value,
    });
    if (success) {
      onClose();
    } else {
      console.error(message);
    }
  };

  return (
    <EditorModal
      title={title}
      animationStyle={animationStyle}
      onDone={updateSetting}
      onClose={onClose}
    >
      <VisibilityChoicesContainer>
        {visibilityChoices.map((visibilityChoice, index) => (
          <RadioButton
            key={`${
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              index
            }`}
            isChecked={visibilityChoice === value}
            label={VISIBILITY_OPTION_LABELS[visibilityChoice]}
            value={visibilityChoice}
            onCheck={handleValueChange}
          />
        ))}
      </VisibilityChoicesContainer>

      {isUpdating && <Spinner />}
    </EditorModal>
  );
};

export default PrivacyEditor;
