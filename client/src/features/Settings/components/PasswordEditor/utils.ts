const MIN_PWD_LENGTH = 4;

export function checkNewPassword(password) {
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

export function checkConfirmPassword(password) {
  if (typeof password !== 'string') {
    return 'Invalid Password';
  }
  if (password.length === 0) {
    return 'Confirm password is required';
  }
  return '';
}

export function checkCurrentPassword(password) {
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
