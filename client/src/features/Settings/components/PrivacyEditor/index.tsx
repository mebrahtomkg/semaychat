import { CSSProperties, type FC, useState, MouseEventHandler } from 'react';
import useAccountUpdater from '../../hooks/useAccountUpdater';
import EditorModal from '../EditorModal';
import RadioButton from '../RadioButton';
import { VisibilityChoicesContainer } from './styles';
import { useAppSelector } from '@/hooks';
import Spinner from '@/Spinner';
import { PrivacySetting } from '../../types';
import { VISIBILITY_OPTION_LABELS } from '../../constants';

interface PrivacyEditorProps {
  privacySetting: PrivacySetting;
  animationStyle: CSSProperties;
  onClose: () => void;
}

const PrivacyEditor: FC<PrivacyEditorProps> = ({
  privacySetting,
  animationStyle,
  onClose
}) => {
  const account = useAppSelector((state) => state.account);
  if (!account) throw new Error('Invalid account!');

  const { settingkey, title, visibilityOptions } = privacySetting;

  const [value, setValue] = useState(account[settingkey]);

  const handleValueChange: MouseEventHandler = (e) =>
    setValue(e.target.dataset.value);

  const { updateAccount, isUpdating } = useAccountUpdater();

  const updateSetting = async () => {
    const { success, message } = await updateAccount({
      [settingkey]: value
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
        {visibilityOptions.map((visibilityOption) => (
          <RadioButton
            key={`${visibilityOption}`}
            isChecked={visibilityOption === value}
            label={VISIBILITY_OPTION_LABELS[visibilityOption]}
            value={visibilityOption}
            onCheck={handleValueChange}
          />
        ))}
      </VisibilityChoicesContainer>

      {isUpdating && <Spinner />}
    </EditorModal>
  );
};

export default PrivacyEditor;
