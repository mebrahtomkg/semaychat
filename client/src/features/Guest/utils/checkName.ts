const MAX_NAME_LENGTH = 25;

const checkName = (name: string) => {
  if (typeof name !== 'string') {
    return 'Invalid name.';
  }

  if (name.length === 0) {
    return 'First Name is rquired.';
  }

  const regExp = /^[A-Za-z][A-Za-z ]*$/;

  if (!regExp.test(name)) {
    return 'Invalid name.';
  }

  if (name.split(' ').length > 3) {
    return 'Name cannot have more than two spaces.';
  }

  if (name.length > MAX_NAME_LENGTH) {
    return 'Name too long.';
  }

  return '';
};

export default checkName;
