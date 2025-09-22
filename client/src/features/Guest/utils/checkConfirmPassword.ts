export default function checkConfirmPassword(password) {
  if (typeof password !== 'string') {
    return 'Invalid password';
  }
  if (password.length === 0) {
    return 'Confirm password is required.';
  }
  return '';
}
