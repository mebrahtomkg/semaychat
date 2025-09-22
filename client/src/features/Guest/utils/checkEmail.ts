const checkEmail = (email: string) => {
  if (typeof email !== 'string') {
    return 'Invalid email.';
  }

  if (email.length === 0) {
    return 'Email is required.';
  }

  const emailParts = email.split('@');

  if (emailParts.length !== 2) {
    return 'Invalid email.';
  }

  const [id, domain] = emailParts;

  if (!/^\w+([.-]?\w+)*$/.test(id)) {
    return 'Invalid email.';
  }

  const lastIndexOfDot = domain.lastIndexOf('.');

  if (lastIndexOfDot === -1) {
    return 'Invalid email.';
  }

  const domainId = domain.substring(0, lastIndexOfDot);

  if (!/^\w+([.-]?\w+)*$/.test(domainId)) {
    return 'Invalid email.';
  }

  const domainExt = domain.substring(lastIndexOfDot);

  if (!/^\.\w{1,6}$/.test(domainExt)) {
    return 'Invalid email.';
  }

  return '';
};

export default checkEmail;
