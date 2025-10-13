const MIN_USERNAME_LENGTH = 5;
const MAX_USERNAME_LENGTH = 15;

export function checkUsername(username: string) {
  username = username.trim();
  if (!username) return null;

  const regExp = /^[A-Za-z][A-Za-z0-9_]*$/;

  if (!regExp.test(username)) {
    return (
      'Username can only contain alphabets, numbers and underscores.' +
      ' And the first character must be alphabet.'
    );
  }

  if (username.length < MIN_USERNAME_LENGTH) {
    return `Minimum length is ${MIN_USERNAME_LENGTH} characters.`;
  }

  if (username.length > MAX_USERNAME_LENGTH) {
    return `Maximum length is ${MAX_USERNAME_LENGTH} characters.`;
  }

  return null;
}
