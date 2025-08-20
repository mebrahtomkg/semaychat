/**
 * Extracts the file extension from a given file name.
 *
 * @param fileName The full name of the file (e.g., "document.pdf", "archive.tar.gz").
 * @returns The file extension without the leading dot (e.g., "pdf", "gz").
 *          Returns an empty string if no extension is found (e.g., "file", "file.").
 *          Returns "bashrc" for hidden files like ".bashrc".
 *          Returns null if the input is not a string.
 */
const getFileExtension = (fileName: string): string => {
  if (typeof fileName !== 'string') return '';

  const lastDotIndex = fileName.lastIndexOf('.');

  // Handle no dot or dot at end.
  if (lastDotIndex === -1 || lastDotIndex === fileName.length - 1) {
    return '';
  }

  // Extract substring after last dot. This correctly handles ".bashrc" as "bashrc".
  return fileName.substring(lastDotIndex + 1);
};

export default getFileExtension;
