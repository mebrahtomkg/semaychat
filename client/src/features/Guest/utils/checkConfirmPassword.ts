const checkConfirmPassword = (password: string) => {
  if (typeof password !== 'string') {
    return 'Invalid password';
  }

  if (password.length === 0) {
    return 'Confirm password is required.';
  }

  return '';
};

export default checkConfirmPassword;
