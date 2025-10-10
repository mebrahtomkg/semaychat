import {
  CSSProperties,
  FC,
  useCallback,
  useMemo,
  MouseEvent,
  useState,
} from 'react';
import { useStableValue, useTimer, useUpdateAccount } from '@/hooks';
import { Account, VisibilityOption } from '@/types';
import { VISIBILITY_OPTION_LABELS } from '../../constants';
import { PrivacyEditorOverlay, PrivacyEditorStyled, Title } from './styles';
import RadioButton from '../RadioButton';

interface PrivacyEditorProps {
  title: string;
  settingkey: keyof Pick<
    Account,
    | 'emailVisibility'
    | 'lastSeenVisibility'
    | 'profilePhotosVisibility'
    | 'messageSender'
  >;
  currentValue: VisibilityOption;
  possibleValues: VisibilityOption[];
  onClose: () => void;
  animationStyle?: CSSProperties;
}

const PrivacyEditor: FC<PrivacyEditorProps> = ({
  title,
  settingkey,
  currentValue,
  possibleValues,
  animationStyle,
  onClose,
}) => {
  const { updateAccount } = useUpdateAccount();
  const { setTimer } = useTimer();
  const stablePossibleValues = useStableValue(possibleValues);
  const [selectedValue, setSelectedValue] = useState(currentValue);

  const handleSelect = useCallback(
    async (value: string) => {
      setSelectedValue(value as VisibilityOption);

      // Let the user see the selected button get animated before closing the modal
      await new Promise<void>((resolve) => setTimer(resolve, 300));
      onClose();

      // Close this modal before entering into heavy task of updating account
      await new Promise<void>((resolve) => setTimer(resolve, 70));
      updateAccount({ [settingkey]: value });
    },
    [onClose, setTimer, updateAccount, settingkey],
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

  const handleOverlayClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) onClose();
  };

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
