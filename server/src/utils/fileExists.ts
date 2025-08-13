import fs from 'node:fs/promises';

// Checks if a file or directory exists at the given path using promise-based fs.stat().
const fileExists = async (filePath: string) => {
  try {
    await fs.stat(filePath);
    return true;
  } catch (_error) {}
  return false;
};

export default fileExists;
