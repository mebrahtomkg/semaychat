const MIN_PASSWORD_LENGTH = 4;

export default function checkPassword(password) {
  if (typeof password !== 'string') {
    return 'Invalid password';
  }
  if (password.length === 0) {
    return 'Password is required.';
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return 'Invalid password';
  }
  return '';
}
