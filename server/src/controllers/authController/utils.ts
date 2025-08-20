import {
  MAX_NAME_LENGTH,
  MAX_PWD_LENGTH,
  MIN_PWD_LENGTH,
} from '@/config/general';

export const checkEmail = (userEmail: string) => {
  if (typeof userEmail !== 'string') return false;

  const email = userEmail.split('@');
  if (email.length !== 2) return false;

  const [id, domain] = email;
  if (!/^\w+([.-]?\w+)*$/.test(id)) return false;

  const index = domain.lastIndexOf('.');
  if (index === -1) return false;

  const domainId = domain.substring(0, index);
  if (!/^\w+([.-]?\w+)*$/.test(domainId)) return false;

  const domainExt = domain.substring(index);
  return /^\.\w{1,6}$/.test(domainExt);
};

export const checkPassword = (password: string) => {
  if (typeof password !== 'string') return false;

  return password.length >= MIN_PWD_LENGTH && password.length <= MAX_PWD_LENGTH;
};

export const checkFirstName = (name: string) => {
  if (typeof name !== 'string') return false;

  if (name.length === 0) return false;

  return name.length <= MAX_NAME_LENGTH;
};
