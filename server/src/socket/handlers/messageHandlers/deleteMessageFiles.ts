import { MESSAGE_FILES_BUCKET } from '@/config/general';
import storage from '@/config/storage';

const MAX_FILE_DELETE_RETRIES = 3;

const deleteFile = async (file: string): Promise<boolean> => {
  try {
    await storage.deleteFile(MESSAGE_FILES_BUCKET, file);
    return true;
  } catch (err) {
    console.error('File Delete Error:', err);
  }
  return false;
};

const deleteMessageFiles = async (files: string[]) => {
  try {
    for (const file of files) {
      let retryCount = 0;
      while (retryCount < MAX_FILE_DELETE_RETRIES) {
        if (await deleteFile(file)) break;
        retryCount++;
      }
    }
  } catch (err) {
    console.error(err);
  }
};

export default deleteMessageFiles;
