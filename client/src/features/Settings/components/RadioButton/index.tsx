import { FC, useCallback } from 'react';
import {
  RadioButtonIconStyled,
  RadioButtonBallIconStyled,
  RadioButtonContainer,
  RadioButtonLabel,
  RadioButtonIconContainer,
} from './styles';

interface RadioButtonProps {
  isChecked: boolean;
  label: string;
  value: string;
  onCheck: (value: string) => void;
}

const RadioButton: FC<RadioButtonProps> = ({
  isChecked,
  label,
  value,
  onCheck,
}) => {
  const handleClick = useCallback(() => onCheck(value), [onCheck, value]);

  return (
    <RadioButtonContainer>
      <RadioButtonIconContainer>
        <RadioButtonIconStyled role="radio" onClick={handleClick} />

        <RadioButtonBallIconStyled $isVisible={isChecked} />
      </RadioButtonIconContainer>

      <RadioButtonLabel onClick={handleClick}>{label}</RadioButtonLabel>
    </RadioButtonContainer>
  );
};

export default RadioButton;
