import path from 'node:path';
import { fileURLToPath } from 'node:url';

console.log('=============== SemayChat ========================');

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
console.log('Deployment mode:', process.env.NODE_ENV);

export const MAX_NAME_LENGTH = 15;
export const MIN_PWD_LENGTH = 4;
export const MAX_PWD_LENGTH = 20;
export const MAX_BIO_LENGTH = 80;

export const AUTH_TOKEN_COOKIE_NAME = 'auth_token';
export const AUTH_TOKEN_AGE = 1000 * 60 * 60 * 60 * 60;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'temp-secret-key-1';
console.log('JWT_SECRET_KEY:', JWT_SECRET_KEY);

/** Number of rounds to use for hashing password. */
export const PASSWORD_HASHING_ROUNDS = 5;
console.log('PASSWORD_HASHING_ROUNDS:', PASSWORD_HASHING_ROUNDS);

export const MAX_PROFILE_PHOTO_FILE_SIZE = 5 * 1024 * 1024;

export const MAX_MESSAGE_FILE_SIZE = 25 * 1024 * 1024;

// Get the current file's path using import.meta.url
const __filename = fileURLToPath(import.meta.url);

// Get the current directory's path from the file path
const __dirname = path.dirname(__filename);

// This is just the absolute path of the /server folder
export const ROOT_DIR = path.resolve(__dirname, '../../');
console.log('Server root dir:', ROOT_DIR);

export const PROFILE_PHOTOS_BUCKET = 'profile-photos';
export const MESSAGE_FILES_BUCKET = 'message-files';

// The port in which the server to listen(run)
export const PORT = 3000;
console.log('Server port:', PORT);

export const ALLOWED_ORIGINS =
  process.env.ALLOWED_ORIGINS?.split(',') ||
  (!IS_PRODUCTION ? ['http://localhost:8080'] : []);

if (ALLOWED_ORIGINS.length) {
  console.log('Allowed origins:', ALLOWED_ORIGINS.join('  '));
} else {
  console.warn('No allowed origin(s) is/are provided. Browsers maynot work!');
}

export const SOCKET_USER_TIME_TO_LIVE = 45000; // 45seconds
