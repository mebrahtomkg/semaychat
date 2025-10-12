import {
  FC,
  FormEventHandler,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  HelperText,
  InputStyled,
  LabelStyled,
  TextInputStyled,
} from './styles';

interface TextInputProps {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  value: string;
  shouldFocus?: boolean;
  onChange: FormEventHandler;
  onEnterPress?: KeyboardEventHandler<HTMLInputElement>;
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
  errorMessage,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const infoRef = useRef<HTMLSpanElement | null>(null);

  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);

  useEffect(() => {
    if (shouldFocus && inputRef.current) inputRef.current.focus();
  }, [shouldFocus]);

  useEffect(() => {
    if (errorMessage && infoRef.current) {
      infoRef.current.animate(
        [
          { transform: 'translateX(0px)' },
          { transform: 'translateX(12px)' },
          { transform: 'translateX(0px)' },
          { transform: 'translateX(12px)' },
          { transform: 'translateX(0px)' },
        ],
        700,
      );
    }
  }, [errorMessage]);

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (onEnterPress && event.key === 'Enter') {
      event.preventDefault();
      onEnterPress(event);
    }
  };

  const handleClick = useCallback(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <TextInputStyled onClick={handleClick} $isFocused={isFocused}>
      <LabelStyled htmlFor={name} $isAsLabel={!!value || isFocused}>
        {label}
      </LabelStyled>

      <InputStyled
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        ref={inputRef}
        onKeyDown={handleKeyDown}
        onInput={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {(errorMessage || helperText) && (
        <HelperText ref={infoRef}>{errorMessage || helperText}</HelperText>
      )}
    </TextInputStyled>
  );
};

export default TextInput;
