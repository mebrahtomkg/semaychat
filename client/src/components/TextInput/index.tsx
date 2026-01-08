import {
  FC,
  FocusEventHandler,
  HTMLInputTypeAttribute,
  InputEventHandler,
  KeyboardEventHandler,
  RefCallback,
  RefObject,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  Info,
  InfoContainer,
  InputStyled,
  LabelStyled,
  TextInputStyled,
  TextInputViewPort,
} from './styles';
import { TextInputImperativeHandle } from './types';
import { ChangeHandler } from 'react-hook-form';

export { default as useTextInput } from './useTextInput';

interface TextInputProps {
  id: string;
  label: string;
  type: HTMLInputTypeAttribute;
  name: string;
  onChange: ChangeHandler;
  onBlur: ChangeHandler;
  imperativeRef: RefObject<TextInputImperativeHandle | null>;
  inputRef: RefCallback<HTMLInputElement | null>;
  defaultValue: string;
  onEnter?: () => void;
  info?: string;
  error?: string;
}

const TextInput: FC<TextInputProps> = ({
  id,
  label,
  type,
  name,
  onChange,
  onBlur,
  imperativeRef,
  inputRef,
  defaultValue,
  onEnter,
  info,
  error,
}) => {
  const localInputRef = useRef<HTMLInputElement | null>(null);

  const infoRef = useRef<HTMLParagraphElement | null>(null);
  const [value, setValue] = useState(defaultValue);

  const handleInputRef: RefCallback<HTMLInputElement | null> = useCallback(
    (input) => {
      localInputRef.current = input;
      inputRef(input);
    },
    [inputRef],
  );

  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur: FocusEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      onBlur(e);
      setIsFocused(false);
    },
    [onBlur],
  );

  useImperativeHandle<
    TextInputImperativeHandle,
    TextInputImperativeHandle
  >(imperativeRef, () => {
    return {
      focus() {
        localInputRef.current?.focus();
      },

      shakeError() {
        infoRef.current?.animate(
          [
            { transform: 'translateX(0rem)' },
            { transform: 'translateX(0.8rem)' },
            { transform: 'translateX(-0.8rem)' },
            { transform: 'translateX(0.4rem)' },
            { transform: 'translateX(0rem)' },
          ],
          700,
        );
      },
    };
  }, []);

  const handleInput: InputEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const newValue = e.currentTarget.value;
      setValue(newValue);
      onChange(e);
    },
    [onChange],
  );

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (onEnter && e.key === 'Enter') {
        e.preventDefault();
        onEnter();
      }
    },
    [onEnter],
  );

  const focusInput = useCallback(() => localInputRef.current?.focus(), []);

  const isErrorMode = !!error;

  return (
    <TextInputStyled>
      <TextInputViewPort
        $isErrorMode={isErrorMode}
        onClick={focusInput}
        $isFocused={isFocused}
      >
        <LabelStyled htmlFor={id} $isAsLabel={!!value || isFocused}>
          {label}
        </LabelStyled>

        <InputStyled
          id={id}
          type={type}
          name={name}
          defaultValue={defaultValue}
          ref={handleInputRef}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-invalid={isErrorMode}
          aria-describedby={`${id}-error`}
        />
      </TextInputViewPort>

      <InfoContainer>
        <Info id={`${id}-error`} $isErrorMode={isErrorMode} ref={infoRef}>
          {error || info || ''}
        </Info>
      </InfoContainer>
    </TextInputStyled>
  );
};

export default TextInput;
