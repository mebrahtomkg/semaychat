export function formatTime(time: number): string {
  const date = new Date(time);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const period = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;

  return `${hours}:${minutes} ${period}`;
}

export function formatDateTime(time: number): string {
  const formattedTime = formatTime(time);
  const date = new Date(time);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year} at ${formattedTime}`;
}

/**
 * Returns size in appropriate unit(bytes, kilobytes, megabytes and
 * gigabytes) of the provided size.
 */
export function getSizeInAppropriateUnit(size: number): string {
  const KB = 1024;
  const MB = KB * 1024;
  const GB = MB * 1024;
  if (size < KB) {
    return `${size} B`;
  }
  if (size > GB) {
    size = size / GB;
    return `${size.toFixed(1)} GB`;
  }
  if (size > MB) {
    size = size / MB;
    return `${size.toFixed(1)} MB`;
  }
  size = size / KB;
  return `${size.toFixed(1)} KB`;
}

export function getUniqueId(existingIdList: number[]): number {
  for (let i = 1; i < 1000_000; i++) {
    if (!existingIdList.includes(i)) return i;
  }
  return 1000_000;
}

export function fileListToArray(fileList: FileList): File[] {
  return Array.from(fileList);
}

export function shortenFileName(fileName: string, maxLength: number) {
  if (typeof fileName !== 'string' || !fileName) return fileName;
  if (fileName.length <= maxLength) return fileName;
  const nameParts = fileName.split('.');
  const extension = nameParts.pop();
  const onlyName = nameParts.join('.');
  if (!extension) return onlyName.slice(0, maxLength);

  const CHARS_NEAR_EXT_COUNT = 3;
  const DOTS_COUNT = 3;
  const charsNearExt = onlyName.slice(
    onlyName.length - CHARS_NEAR_EXT_COUNT,
    onlyName.length
  );
  const realMaxLength =
    maxLength - DOTS_COUNT - CHARS_NEAR_EXT_COUNT - 1 - extension.length;

  if (onlyName.length < realMaxLength) return fileName.slice(0, maxLength);

  return `${onlyName.slice(0, realMaxLength)}...${charsNearExt}.${extension}`;
}

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
  'hdr'
];

const AUDIO_EXTENSIONS = [
  'mp3',
  'wav',
  'ogg',
  'aac',
  'flac',
  'aiff',
  'aif',
  'wma',
  'm4a',
  'opus'
];

const VIDEO_EXTENSIONS = [
  'mp4',
  'webm',
  'ogv',
  'avi',
  'mov',
  'flv',
  'wmv',
  'mkv'
];

export function isImage(extension?: string): boolean {
  if (!extension) return false;
  return IMAGE_EXTENSIONS.includes(extension.toLowerCase());
}

export function isVideo(extension?: string): boolean {
  if (!extension) return false;
  return VIDEO_EXTENSIONS.includes(extension.toLowerCase());
}

export function isAudio(extension?: string): boolean {
  if (!extension) return false;
  return AUDIO_EXTENSIONS.includes(extension.toLowerCase());
}
