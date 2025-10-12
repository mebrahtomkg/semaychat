import {
  CSSProperties,
  FC,
  useCallback,
  useMemo,
  useState,
  MouseEventHandler,
} from 'react';
import { useStableValue, useTimer } from '@/hooks';
import { VisibilityOption } from '@/types';
import { VISIBILITY_OPTION_LABELS } from '../../constants';
import { PrivacyEditorOverlay, PrivacyEditorStyled, Title } from './styles';
import RadioButton from '../RadioButton';
import { IPrivacySetting } from '../../types';

type SettingKey = IPrivacySetting['settingkey'];

interface PrivacyEditorProps {
  title: string;
  settingkey: SettingKey;
  currentValue: VisibilityOption;
  possibleValues: VisibilityOption[];
  onSelect: (settingkey: SettingKey, value: VisibilityOption) => void;
  onClose: () => void;
  animationStyle?: CSSProperties;
}

const PrivacyEditor: FC<PrivacyEditorProps> = ({
  title,
  settingkey,
  currentValue,
  possibleValues,
  animationStyle,
  onSelect,
  onClose,
}) => {
  const { setTimer } = useTimer();
  const stablePossibleValues = useStableValue(possibleValues);
  const [selectedValue, setSelectedValue] = useState(currentValue);

  const handleSelect = useCallback(
    async (value: string) => {
      // If the value is not changed. just close the modal.
      if (value === currentValue) return onClose();

      setSelectedValue(value as VisibilityOption);

      // Let the user see the selected button get animated before closing the modal
      await new Promise<void>((resolve) => setTimer(resolve, 250));

      onSelect(settingkey, value as VisibilityOption);
    },
    [currentValue, onClose, setTimer, onSelect, settingkey],
  );

  const radioButtons = useMemo(() => {
    const options = stablePossibleValues.map((option) => ({
      label: VISIBILITY_OPTION_LABELS[option],
      value: option,
    }));

    return options.map(({ label, value }, index) => (
      <RadioButton
        key={`${index}-${value}`}
        id={`id-${index}-${value}`}
        name={settingkey}
        isChecked={value === selectedValue}
        label={label}
        value={value}
        onChange={handleSelect}
      />
    ));
  }, [stablePossibleValues, settingkey, selectedValue, handleSelect]);

  const handleOverlayClick = useCallback<MouseEventHandler<HTMLElement>>(
    (e) => {
      e.stopPropagation();
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  return (
    <PrivacyEditorOverlay onClick={handleOverlayClick}>
      <PrivacyEditorStyled style={animationStyle}>
        <Title>{title}</Title>
        <div>{radioButtons}</div>
      </PrivacyEditorStyled>
    </PrivacyEditorOverlay>
  );
};

export default PrivacyEditor;
