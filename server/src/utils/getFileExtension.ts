const getFileExtension = (fileName: string) => {
  if (typeof fileName !== 'string') return null;

  const lastIndexOfDot = fileName.lastIndexOf('.');
  if (lastIndexOfDot === -1) return '';

  if (lastIndexOfDot + 1 === fileName.length) return '';

  return fileName.substring(lastIndexOfDot + 1);
};

export default getFileExtension;
