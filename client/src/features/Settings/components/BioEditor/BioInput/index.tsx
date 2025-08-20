import { useEffect, useRef } from 'react';
import {
  HelperText,
  LabelWrapper,
  TextInputContainer,
} from '../../TextInput/styles';
import { Counter, MultiLineInput, MultiLineInputContainer } from './styles';

const BioInput = ({
  value,
  count,
  shouldCounterShake,
  onChange,
  onEnterPress,
}) => {
  const handleInputRef = (element) => {
    if (element) {
      element.focus();
      const scrollHeight = element.scrollHeight;
      const clientHeight = element.clientHeight;
      if (scrollHeight - clientHeight > 1) {
        element.style.height = `${scrollHeight}px`;
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onEnterPress();
    }
  };

  const counterRef = useRef(null);

  useEffect(() => {
    if (shouldCounterShake && counterRef.current) {
      counterRef.current.animate(
        [
          { transform: 'translateX(0px)' },
          { transform: 'translateX(6px)' },
          { transform: 'translateX(0px)' },
          { transform: 'translateX(6px)' },
          { transform: 'translateX(0px)' },
        ],
        300,
      );
    }
  }, [shouldCounterShake]);

  return (
    <TextInputContainer>
      <MultiLineInputContainer>
        <MultiLineInput
          as="textarea"
          rows="1"
          cols="20"
          value={value}
          placeholder={'Bio'}
          ref={handleInputRef}
          onKeyDown={handleKeyDown}
          onInput={onChange}
        />
        <Counter ref={counterRef}>{count === -1 ? 0 : count}</Counter>
      </MultiLineInputContainer>

      <HelperText>{'You can add a few lines about yourself.'}</HelperText>
    </TextInputContainer>
  );
};

export default BioInput;
