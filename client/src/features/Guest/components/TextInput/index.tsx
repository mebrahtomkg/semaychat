import {
  FC,
  KeyboardEventHandler,
  MouseEventHandler,
  RefCallback,
} from 'react';
import { InputGroup } from '../../styles';
import { InputError, InputField, InputLabel } from './styles';

interface TextInputProps {
  label: string;
  type: 'text' | 'email' | 'password';
  name: string;
  placeholder?: string;
  value: string;
  shouldFocus: boolean;
  onChangeListener: MouseEventHandler<HTMLInputElement>;
  onEnter: () => void;
  error: string;
  shakeError: boolean;
}

const TextInput: FC<TextInputProps> = ({
  label,
  type = 'text',
  name,
  placeholder = '',
  value,
  shouldFocus,
  onChangeListener,
  onEnter,
  error,
  shakeError,
}) => {
  const handleInputMount: RefCallback<HTMLInputElement> = (element) => {
    if (shouldFocus && element) element.focus();
  };

  const handleKeyDown: KeyboardEventHandler = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onEnter();
    }
  };

  const handleInfoMount: RefCallback<HTMLElement> = (element) => {
    if (shakeError && error && element) {
      element.animate(
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
  };

  const id = `id-${name}`;

  return (
    <InputGroup>
      <InputLabel htmlFor={id}>{label}</InputLabel>

      <InputField
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        ref={handleInputMount}
        onKeyDown={handleKeyDown}
        onInput={onChangeListener}
        id={id}
      />

      {error && <InputError ref={handleInfoMount}>{error}</InputError>}
    </InputGroup>
  );
};

export default TextInput;
