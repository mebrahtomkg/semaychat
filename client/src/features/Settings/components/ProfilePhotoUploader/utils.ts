const IMAGE_EXTENSIONS = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'bmp',
  'tiff',
  'tif',
  'webp',
  'svg',
  'ico',
  'heif',
  'heic',
  'apng',
  'avif',
  'jp2',
  'j2k',
  'hdr',
];

export const getFileExtension = (file) => {
  const { name } = file;
  if (typeof name !== 'string') return null;
  const nameParts = name.split('.');
  return nameParts[nameParts.length - 1];
};

export const isImageFile = (file) => {
  const extension = getFileExtension(file);
  if (typeof extension !== 'string') return false;
  return IMAGE_EXTENSIONS.includes(extension.toLowerCase());
};

/**
 * Returns size in appropriate unit(bytes, kilobytes, megabytes and
 * gigabytes) of the provided size.
 *
 * @param size The size.
 * @return size in appropriate unit.
 */
export const getSizeInAppropriateUnit = (size) => {
  const KB = 1024;
  const MB = KB * 1024;
  const GB = MB * 1024;
  if (size >= GB) return `${Math.round(size / GB)} GB`;
  if (size >= MB) return `${Math.round(size / MB)} MB`;
  if (size >= KB) return `${Math.round(size / KB)} KB`;
  return `${size} B`;
};
