import React, { FC, useEffect, useRef } from 'react';
import {
  HelperText,
  InputStyled,
  LabelStyled,
  LabelWrapper,
  TextInputContainer
} from './styles';

interface TextInputProps {
  label?: string;
  type?: string;
  name: string;
  placeholder?: string;
  value: string;
  shouldFocus?: boolean;
  onChange: (event) => void;
  onEnterPress?: (event) => void;
  helperText?: string;
  errorMessage?: string;
}

const TextInput: FC<TextInputProps> = ({
  label,
  type = 'text',
  name,
  placeholder = '',
  value,
  shouldFocus = true,
  onChange,
  onEnterPress,
  helperText,
  errorMessage
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const infoRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (shouldFocus && inputRef.current) inputRef.current.focus();
  });

  useEffect(() => {
    if (errorMessage && infoRef.current) {
      infoRef.current.animate(
        [
          { transform: 'translateX(0px)' },
          { transform: 'translateX(12px)' },
          { transform: 'translateX(0px)' },
          { transform: 'translateX(12px)' },
          { transform: 'translateX(0px)' }
        ],
        700
      );
    }
  }, [errorMessage]);

  const handleKeyDown = (event) => {
    if (onEnterPress && event.key === 'Enter') {
      event.preventDefault();
      onEnterPress(event);
    }
  };

  return (
    <TextInputContainer>
      {label && (
        <LabelWrapper>
          <LabelStyled htmlFor={name}>{label}</LabelStyled>
        </LabelWrapper>
      )}
      <InputStyled
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        ref={inputRef}
        onKeyDown={handleKeyDown}
        onInput={onChange}
      />
      {(errorMessage || helperText) && (
        <HelperText ref={infoRef}>{errorMessage || helperText}</HelperText>
      )}
    </TextInputContainer>
  );
};

export default TextInput;
