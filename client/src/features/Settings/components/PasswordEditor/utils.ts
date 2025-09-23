const MIN_PWD_LENGTH = 4;

export function checkNewPassword(password: string) {
  if (typeof password !== 'string') {
    return 'Invalid Password';
  }

  if (password.length === 0) {
    return 'Password is required';
  }

  if (password.length < MIN_PWD_LENGTH) {
    return 'Password too short';
  }

  return '';
}

export function checkConfirmPassword(password: string) {
  if (typeof password !== 'string') {
    return 'Invalid Password';
  }

  if (password.length === 0) {
    return 'Confirm password is required';
  }

  return '';
}

export function checkCurrentPassword(password: string) {
  if (typeof password !== 'string') {
    return 'Invalid Password';
  }

  if (password.length === 0) {
    return 'Password is required';
  }

  if (password.length < MIN_PWD_LENGTH) {
    return 'Invalid password';
  }

  return '';
}
