export function checkFirstName(name) {
  if (name.length === 0) {
    return 'First name is required';
  }
  if (name.length > 15) {
    return 'First name too long';
  }
  return '';
}

export function checkLastName(name) {
  if (name.length > 15) {
    return 'Last name too long';
  }
  return '';
}
