import { FC } from 'react';
import {
  BoxContainer,
  CheckBoxIconStyled,
  CheckBoxLabel,
  CheckBoxStyled,
  CheckBoxTickIconStyled
} from './styles';

interface CheckBoxProps {
  isChecked: boolean;
  label: string;
  onToggle: () => void;
}

const CheckBox: FC<CheckBoxProps> = ({ label, isChecked, onToggle }) => {
  return (
    <CheckBoxStyled>
      <BoxContainer>
        <CheckBoxIconStyled
          role="checkbox"
          aria-checked={isChecked}
          $isChecked={isChecked}
          onClick={onToggle}
        />

        <CheckBoxTickIconStyled $isChecked={isChecked} />
      </BoxContainer>

      <CheckBoxLabel onClick={onToggle}>{label}</CheckBoxLabel>
    </CheckBoxStyled>
  );
};

export default CheckBox;
