export const formatMediaTime = (timeInSeconds: number) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor((timeInSeconds % 3600) % 60);
  const formatedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${hours ? `${hours}:` : ''}${minutes}:${formatedSeconds}`;
};
