import { CSSProperties, type FC, useCallback, useMemo } from 'react';
import { useAccount, useTimer, useUpdateAccount } from '@/hooks';
import { VISIBILITY_OPTION_LABELS } from '../PrivacySettings/constants';
import { IPrivacySetting } from './types';
import RadioGroup from '../RadioGroup';

interface PrivacyEditorProps {
  setting: IPrivacySetting;
  onClose: () => void;
  animationStyle?: CSSProperties;
}

const PrivacyEditor: FC<PrivacyEditorProps> = ({
  setting,
  animationStyle,
  onClose,
}) => {
  const account = useAccount();
  const { updateAccount } = useUpdateAccount();

  const { settingkey, title, visibilityOptions } = setting;

  const { setTimer } = useTimer();

  const handleSelect = useCallback(
    async (_name: string, value: string) => {
      onClose();

      // Important! Let the UI update(closeRadioGroup Modal) before entering in to heavy task.
      await new Promise<void>((resolve) => setTimer(resolve, 70));

      updateAccount({ [settingkey]: value });
    },
    [onClose, setTimer, updateAccount, settingkey],
  );

  const radioGroupOptions = useMemo(
    () =>
      visibilityOptions.map((option) => ({
        label: VISIBILITY_OPTION_LABELS[option],
        value: option,
      })),
    [visibilityOptions],
  );

  return (
    <RadioGroup
      title={title}
      name={settingkey}
      value={account[settingkey]}
      options={radioGroupOptions}
      onSelect={handleSelect}
      onClose={onClose}
      animationStyle={animationStyle}
    />
  );
};

export default PrivacyEditor;
