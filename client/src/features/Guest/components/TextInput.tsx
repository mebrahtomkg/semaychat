import styled from 'styled-components';

export const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const InputLabel = styled.label`
  font-size: 1rem;
  font-weight: 500;
  color: #b1b1b1;
`;

const InputField = styled.input`
  width: 300px;
  padding: 0.4rem 0.6rem;
  outline-style: none;
  box-shadow: none;
  border: 1px solid #2f8396;
  border-radius: 0;
  font-size: 1.1rem;
  font-weight: 400;
  color: #c2c2c2;
  background-color: transparent;
  caret-color: #03ffe7;
  &:focus {
    border-color: #1fb5d6;
  }
`;

const InputError = styled.p`
  margin-left: 3px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #b93917;
`;

export default function TextInput({
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
}) {
  const onInputMount = (element) => {
    if (element && shouldFocus) {
      element.focus();
    }
  };
  const keyDownHandeler = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onEnter(event);
    }
  };
  const onInfoMount = (element) => {
    if (element && error && shakeError) {
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
        ref={onInputMount}
        onKeyDown={keyDownHandeler}
        onInput={onChangeListener}
        id={id}
      />
      {error && <InputError ref={onInfoMount}>{error}</InputError>}
    </InputGroup>
  );
}
