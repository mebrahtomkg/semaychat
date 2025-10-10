import { CSSProperties, FC, useCallback, useMemo, useState } from 'react';
import RadioButton from '../RadioButton';
import { RadioGroupOverlay, RadioGroupStyled, Title } from './styles';
import { useStableValue, useTimer } from '@/hooks';

interface RadioGroupProps {
  title: string;
  name: string;
  value: string;
  options: { label: string; value: string }[];
  onSelect: (name: string, value: string) => void;
  onClose: () => void;
  animationStyle?: CSSProperties;
}

const RadioGroup: FC<RadioGroupProps> = ({
  title,
  name,
  value,
  options,
  onSelect,
  onClose,
  animationStyle,
}) => {
  const stableOptions = useStableValue(options);
  const { setTimer } = useTimer();
  const [selectedValue, setSelectedValue] = useState(value);

  const handleRadioButtonCheck = useCallback(
    async (value: string) => {
      setSelectedValue(value);

      // used await here to make sure no batch update happen
      await new Promise<void>((resolve) => setTimer(resolve, 300));

      onSelect(name, value);
    },
    [onSelect, name, setTimer],
  );

  const radioButtons = useMemo(
    () =>
      stableOptions.map((option) => (
        <RadioButton
          key={`${option.label}-${option.value}`}
          id={`id-${option.value}`}
          name={name}
          isChecked={option.value === selectedValue}
          label={option.label}
          value={option.value}
          onChange={handleRadioButtonCheck}
        />
      )),
    [stableOptions, name, selectedValue, handleRadioButtonCheck],
  );

  const handleOverlayClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <RadioGroupOverlay onClick={handleOverlayClick}>
      <RadioGroupStyled style={animationStyle}>
        <Title>{title}</Title>
        <div>{radioButtons}</div>
      </RadioGroupStyled>
    </RadioGroupOverlay>
  );
};

export default RadioGroup;
