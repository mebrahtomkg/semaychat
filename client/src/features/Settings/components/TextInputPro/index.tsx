import {
  FC,
  FormEventHandler,
  HTMLInputTypeAttribute,
  KeyboardEventHandler,
  RefObject,
  useCallback,
  useEffect,
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

export interface TextInputImperativeHandle {
  focusInput: () => void;
  animateInfo: () => void;
}

interface TextInputProps {
  id: string;
  label: string;
  type: HTMLInputTypeAttribute;
  name: string;
  value: string;
  onChange: FormEventHandler<HTMLInputElement>;
  ref: RefObject<TextInputImperativeHandle | null>;
  onEnter?: KeyboardEventHandler<HTMLInputElement>;
  helperText?: string;
  errorMessage?: string;
}

const TextInput: FC<TextInputProps> = ({
  id,
  label,
  type,
  name,
  value,
  onChange,
  ref,
  onEnter,
  helperText,
  errorMessage,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const infoRef = useRef<HTMLParagraphElement | null>(null);

  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);

  useImperativeHandle<
    TextInputImperativeHandle,
    TextInputImperativeHandle
  >(ref, () => {
    return {
      focusInput() {
        inputRef.current?.focus();
      },

      animateInfo() {
        infoRef.current?.animate(
          [
            { transform: 'translateX(0rem)' },
            { transform: 'translateX(0.8rem)' },
            { transform: 'translateX(0rem)' },
            { transform: 'translateX(0.8rem)' },
            { transform: 'translateX(0rem)' },
          ],
          700,
        );
      },
    };
  }, []);

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (e) => {
      if (onEnter && e.key === 'Enter') {
        e.preventDefault();
        onEnter(e);
      }
    },
    [onEnter],
  );

  const focusInput = useCallback(() => inputRef.current?.focus(), []);

  const info = errorMessage || helperText;

  return (
    <TextInputStyled>
      <TextInputViewPort onClick={focusInput} $isFocused={isFocused}>
        <LabelStyled htmlFor={id} $isAsLabel={!!value || isFocused}>
          {label}
        </LabelStyled>

        <InputStyled
          id={id}
          type={type}
          name={name}
          value={value}
          ref={inputRef}
          onKeyDown={handleKeyDown}
          onInput={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </TextInputViewPort>

      <InfoContainer>{info && <Info ref={infoRef}>{info}</Info>}</InfoContainer>
    </TextInputStyled>
  );
};

export default TextInput;
