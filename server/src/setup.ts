import fs from 'node:fs';
import {
  MESSAGE_FILES_DIR,
  PROFILE_PHOTOS_DIR,
  SQLITE_DATABASE_DIR,
  TEMP_FILES_DIR
} from './constants';

const setup = () => {
  if (!fs.existsSync(SQLITE_DATABASE_DIR)) {
    fs.mkdirSync(SQLITE_DATABASE_DIR, { recursive: true });
  }

  if (!fs.existsSync(TEMP_FILES_DIR)) {
    fs.mkdirSync(TEMP_FILES_DIR, { recursive: true });
  }

  if (!fs.existsSync(PROFILE_PHOTOS_DIR)) {
    fs.mkdirSync(PROFILE_PHOTOS_DIR, { recursive: true });
  }

  if (!fs.existsSync(MESSAGE_FILES_DIR)) {
    fs.mkdirSync(MESSAGE_FILES_DIR, { recursive: true });
  }
};

export default setup;
