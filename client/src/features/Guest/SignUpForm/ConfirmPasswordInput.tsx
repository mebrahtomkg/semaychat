import React from 'react';
import TextInput from '../TextInput';

export default function ConfirmPasswordInput({
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
        label: 'Confirm Password',
        type: 'password',
        name: 'confirmPassword',
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

export function checkConfirmPassword(password) {
  if (typeof password !== 'string') {
    return 'Invalid password';
  }
  if (password.length === 0) {
    return 'Confirm password is required.';
  }
  return '';
}
