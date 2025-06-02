import path from 'node:path';
import { VisibilityOption } from '../types';
import fs from 'node:fs';

export const MAX_NAME_LENGTH = 15;

export const MIN_PWD_LENGTH = 4;
export const MAX_PWD_LENGTH = 20;

export const MAX_BIO_LENGTH = 80;

export const AUTH_TOKEN_COOKIE_NAME = 'auth_token';
export const AUTH_TOKEN_AGE = 1000 * 60 * 60 * 60 * 60;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'temp-secret-key';

/** Number of rounds to use for hashing password. */
export const PASSWORD_HASHING_ROUNDS = 5;

export const VISIBILITY_OPTIONS: Record<string, VisibilityOption> = {
  everybody: 'everybody',
  contacts: 'contacts',
  nobody: 'nobody'
};

export const EMAIL_VISIBILITY = {
  defaultValue: VISIBILITY_OPTIONS.contacts,
  visibilityChoices: [
    VISIBILITY_OPTIONS.everybody,
    VISIBILITY_OPTIONS.contacts,
    VISIBILITY_OPTIONS.nobody
  ]
};

export const LAST_SEEN_VISIBILITY = {
  defaultValue: VISIBILITY_OPTIONS.everybody,
  visibilityChoices: [
    VISIBILITY_OPTIONS.everybody,
    VISIBILITY_OPTIONS.contacts,
    VISIBILITY_OPTIONS.nobody
  ]
};

export const PROFILE_PHOTOS_VISIBILITY = {
  defaultValue: VISIBILITY_OPTIONS.everybody,
  visibilityChoices: [
    VISIBILITY_OPTIONS.everybody,
    VISIBILITY_OPTIONS.contacts,
    VISIBILITY_OPTIONS.nobody
  ]
};

export const MESSAGE_SENDER = {
  defaultValue: VISIBILITY_OPTIONS.everybody,
  visibilityChoices: [
    VISIBILITY_OPTIONS.everybody,
    VISIBILITY_OPTIONS.contacts,
    VISIBILITY_OPTIONS.nobody
  ]
};

export const MAX_PROFILE_PHOTO_FILE_SIZE = 2 * 1024 * 1024;

// const ROOT_DIR = path.resolve(__dirname, '../../');

// const STORAGE_DIR = path.resolve(ROOT_DIR, 'storage');

const STORAGE_DIR = '/storage';

export const DATABASE_DIR = path.resolve(STORAGE_DIR, 'database');

export const TEMP_FILES_DIR = path.resolve(STORAGE_DIR, 'temp_files');
if (!fs.existsSync(TEMP_FILES_DIR)) {
  fs.mkdirSync(TEMP_FILES_DIR, { recursive: true });
}

export const MESSAGE_FILES_DIR = path.resolve(STORAGE_DIR, 'message_files');

export const PROFILE_PHOTOS_DIR = path.resolve(STORAGE_DIR, 'profile_photos');
if (!fs.existsSync(PROFILE_PHOTOS_DIR)) {
  fs.mkdirSync(PROFILE_PHOTOS_DIR, { recursive: true });
}

export const PUBLIC_DIR = path.resolve(__dirname, '../../../client/public');

// The port in which the server to listen(run)
export const PORT = 3000;

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
