export * from './smartFetch';
export { default as smartFetch } from './smartFetch';

export function ready(handler) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handler);
  } else {
    handler();
  }
}

export const calculateFullName = (firstName, lastName) => {
  const fullName = [firstName, lastName]
    .filter((name) => (name ? true : false))
    .join(' ');

  return fullName || '?'; // Return ? if both names are missing
};

export const calculateNameInitials = (firstName, lastName) => {
  const initials = [
    firstName ? firstName[0] : '',
    lastName ? lastName[0] : ''
  ].filter((name) => (name ? true : false));

  return initials.join('').toUpperCase() || '?'; // Default to '?' if no initials found;
};

export const formatTime = (time) => {
  const date = new Date(time);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const period = hours >= 12 ? 'PM' : 'AM';
  // 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23
  // 0 1 2 3 4 5 6 7 8 9 10 11 0  1  2  3  4  5  6  7  8  9  10 11
  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minutes} ${period}`;
};

export const formatDateTime = (time) => {
  const formattedTime = formatTime(time);
  const date = new Date(time);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year} at ${formattedTime}`;
};
