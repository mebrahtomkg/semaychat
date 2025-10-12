import { FC, useCallback } from 'react';
import {
  RadioButtonIconStyled,
  RadioButtonBallIconStyled,
  RadioButtonContainer,
  RadioButtonLabel,
  RadioButtonIconContainer,
  HiddenRadioButtonInput,
} from './styles';

interface RadioButtonProps {
  id: string;
  name: string;
  isChecked: boolean;
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const RadioButton: FC<RadioButtonProps> = ({
  id,
  name,
  isChecked,
  label,
  value,
  disabled = false,
  onChange,
}) => {
  // Handle change event from the native input
  const handleClick = useCallback(() => {
    if (!disabled) {
      onChange(value);
    }
  }, [onChange, value, disabled]);

  return (
    <RadioButtonContainer>
      <HiddenRadioButtonInput
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={isChecked}
        disabled={disabled}
        onClick={handleClick}
        onChange={handleClick}
      />

      <RadioButtonLabel htmlFor={id} onClick={handleClick}>
        <RadioButtonIconContainer>
          <RadioButtonIconStyled />
          <RadioButtonBallIconStyled $isVisible={isChecked} />
        </RadioButtonIconContainer>

        {label}
      </RadioButtonLabel>
    </RadioButtonContainer>
  );
};

export default RadioButton;
