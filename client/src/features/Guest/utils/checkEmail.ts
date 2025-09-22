export default function checkEmail(email) {
  if (typeof email !== 'string') {
    return 'Invalid email.';
  }
  if (email.length === 0) {
    return 'Email is required.';
  }
  email = email.split('@');
  if (email.length !== 2) {
    return 'Invalid email.';
  }
  const [id, domain] = email;
  if (!/^\w+([.-]?\w+)*$/.test(id)) {
    return 'Invalid email.';
  }
  const index = domain.lastIndexOf('.');
  if (index === -1) {
    return 'Invalid email.';
  }
  const domainId = domain.substring(0, index);
  if (!/^\w+([.-]?\w+)*$/.test(domainId)) {
    return 'Invalid email.';
  }
  const domainExt = domain.substring(index);
  if (!/^\.\w{1,6}$/.test(domainExt)) {
    return 'Invalid email.';
  }
  return '';
}
