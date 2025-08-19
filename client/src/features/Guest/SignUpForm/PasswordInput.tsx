
import TextInput from '../TextInput';

const MIN_PASSWORD_LENGTH = 4;

export default function PasswordInput({
  value,
  shouldFocus,
  onChangeListener,
  onEnter,
  error,
  shakeError
}) {
  return (
    <TextInput
      {...{
        label: 'Password',
        type: 'password',
        name: 'password',
        value,
        shouldFocus,
        onChangeListener,
        onEnter,
        error,
        shakeError
      }}
    />
  );
}

export function checkPassword(password) {
  if (typeof password !== 'string') {
    return 'Invalid password';
  }
  if (password.length === 0) {
    return 'Password is required.';
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return 'Password too short.';
  }
  return '';
}
