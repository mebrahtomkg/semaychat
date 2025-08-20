import { FC, MouseEventHandler } from 'react';
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
  onCheck: MouseEventHandler<SVGElement>;
}

const RadioButton: FC<RadioButtonProps> = ({
  isChecked,
  label,
  value,
  onCheck,
}) => {
  return (
    <RadioButtonContainer>
      <RadioButtonIconContainer>
        <RadioButtonIconStyled
          role="radio"
          data-value={value}
          onClick={onCheck}
        />

        <RadioButtonBallIconStyled $isVisible={isChecked} />
      </RadioButtonIconContainer>

      <RadioButtonLabel data-value={value} onClick={onCheck}>
        {label}
      </RadioButtonLabel>
    </RadioButtonContainer>
  );
};

export default RadioButton;
