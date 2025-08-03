import fs from 'node:fs';
import {
  FILES_STORAGE_DIR,
  FILES_STORAGE_TYPE,
  FILES_STORAGE_TYPE_OPTIONS,
  MESSAGE_FILES_BUCKET,
  PROFILE_PHOTOS_BUCKET,
  SQLITE_DATABASE_DIR,
  TEMP_FILES_DIR
} from './constants';
import { databaseConfig } from './config/db';
import path from 'node:path';

const setup = () => {
  if (
    databaseConfig.dialect === 'sqlite' &&
    !fs.existsSync(SQLITE_DATABASE_DIR)
  ) {
    fs.mkdirSync(SQLITE_DATABASE_DIR, { recursive: true });
  }

  if (!fs.existsSync(TEMP_FILES_DIR)) {
    fs.mkdirSync(TEMP_FILES_DIR, { recursive: true });
  }

  if (FILES_STORAGE_TYPE === FILES_STORAGE_TYPE_OPTIONS.localdisk) {
    const profilePhotosDir = path.resolve(
      FILES_STORAGE_DIR,
      PROFILE_PHOTOS_BUCKET
    );
    if (!fs.existsSync(profilePhotosDir)) {
      fs.mkdirSync(profilePhotosDir, { recursive: true });
    }
    console.log('Storing profile photos at: ', profilePhotosDir);

    const messageFilesDir = path.resolve(
      FILES_STORAGE_DIR,
      MESSAGE_FILES_BUCKET
    );
    if (!fs.existsSync(messageFilesDir)) {
      fs.mkdirSync(messageFilesDir, { recursive: true });
    }
    console.log('Storing message files at: ', messageFilesDir);
  }
};

export default setup;
