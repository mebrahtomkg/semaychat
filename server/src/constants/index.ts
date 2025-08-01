import path from 'node:path';
import { VisibilityOption } from '../types';

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export const MAX_NAME_LENGTH = 15;

export const MIN_PWD_LENGTH = 4;
export const MAX_PWD_LENGTH = 20;

export const MAX_BIO_LENGTH = 80;

export const AUTH_TOKEN_COOKIE_NAME = 'auth_token';
export const AUTH_TOKEN_AGE = 1000 * 60 * 60 * 60 * 60;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'temp-secret-key-1';

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

export const FILES_STORAGE_TYPE_OPTIONS = {
  localdisk: 'localdisk',
  supabase: 'supabase'
};

export const FILES_STORAGE_TYPE =
  process.env.FILES_STORAGE_TYPE || FILES_STORAGE_TYPE_OPTIONS.localdisk;

// This is just the absolute pathe of the /server folder
const ROOT_DIR = path.resolve(__dirname, '../../');

// Absolute path of a folder to store profile photos, message files, and temp files.
export const FILES_STORAGE_DIR =
  process.env.FILES_STORAGE_DIR || path.resolve(ROOT_DIR, 'storage');

// Absolute path of a folder to store SQLtie database file.
export const SQLITE_DATABASE_DIR =
  process.env.SQLITE_DB_STORAGE || path.resolve(FILES_STORAGE_DIR, 'database');

export const TEMP_FILES_DIR = path.resolve(FILES_STORAGE_DIR, 'temp_files');

export const PROFILE_PHOTOS_DIR = path.resolve(
  FILES_STORAGE_DIR,
  'profile_photos'
);

export const MESSAGE_FILES_BUCKET = 'message-files';

export const MESSAGE_FILES_DIR = path.resolve(
  FILES_STORAGE_DIR,
  MESSAGE_FILES_BUCKET
);

export const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(',') || [
  'http://localhost:8080'
];

// The port in which the server to listen(run)
export const PORT = 3000;
