export const formatMediaTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);

  const minutes = Math.floor((seconds % 3600) / 60);

  seconds = Math.floor((seconds % 3600) % 60);
  seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return `${hours ? `${hours}:` : ''}${minutes}:${seconds}`;
};
