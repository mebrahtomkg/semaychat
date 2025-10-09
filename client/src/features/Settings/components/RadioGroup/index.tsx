import { CSSProperties, FC, useCallback, useMemo, useState } from 'react';
import RadioButton from '../RadioButton';
import { RadioGroupOverlay, RadioGroupStyled, Title } from './styles';
import { useAnimation } from '@/Animation';
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

const RadioGroupBase: FC<RadioGroupProps> = ({
  title,
  name,
  value,
  options,
  onSelect,
  onClose,
  animationStyle,
}) => {
  const cachedOptions = useStableValue(options);
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
      cachedOptions.map((option) => (
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
    [cachedOptions, name, selectedValue, handleRadioButtonCheck],
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

interface AnimatedRadioGroupProps
  extends Omit<RadioGroupProps, 'animationStyle'> {
  isVisible: boolean;
}

const RadioGroup: FC<AnimatedRadioGroupProps> = ({
  isVisible,
  ...restProps
}) => {
  const { isMounted, animationStyle } = useAnimation(isVisible, {
    initialStyles: { opacity: 0.0, transform: 'scale(0.85)' },
    finalStyles: { opacity: 1, transform: 'scale(1.0)' },
    transition: {
      property: ['transform', 'opacity'],
      duration: [200, 200],
      timingFunction: ['ease-in-out', 'ease-in-out'],
    },
  });

  return (
    isMounted && (
      <RadioGroupBase {...restProps} animationStyle={animationStyle} />
    )
  );
};

export default RadioGroup;
