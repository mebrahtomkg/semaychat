import { Theme } from './types';

export const IS_PRODUCTION = window.IS_PRODUCTION;

export const API_BASE_URL = IS_PRODUCTION
  ? window.API_URL
  : `${document.location.protocol}//${document.location.hostname}:3000/api`;

export const DEFAULT_THEME: Theme = 'dark';

export const QUERY_KEY_CONTACTS = 'contacts';
export const QUERY_KEY_BLOCKED_USERS = 'blockedUsers';
export const QUERY_KEY_MESSAGES = 'messages';
export const QUERY_KEY_CHATS = 'chats';
export const QUERY_KEY_ACCOUNT = 'account';

export const HEARTBEAT_INTERVAL_TIME = 30000;

export const AVATAR_VARIANTS_COUNT = 8;
