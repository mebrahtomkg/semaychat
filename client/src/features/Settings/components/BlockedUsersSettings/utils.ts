export function checkFirstName(name: string) {
  if (name.length === 0) {
    return 'First name is required';
  }

  if (name.length > 15) {
    return 'First name too long';
  }

  return '';
}

export function checkLastName(name: string) {
  if (name.length > 15) {
    return 'Last name too long';
  }

  return '';
}
