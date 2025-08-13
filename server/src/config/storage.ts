import {
  MESSAGE_FILES_BUCKET,
  PROFILE_PHOTOS_BUCKET,
  ROOT_DIR
} from './general';
import path from 'node:path';
import { StorageType } from '@/types';
import fs from 'node:fs';
import { IStorageProvider } from '@/interfaces';
import { LocalStorageProvider, SupabaseStorageProvider } from '@/providers';
import { createClient } from '@supabase/supabase-js';

const storageType: StorageType =
  (process.env.STORAGE_TYPE as StorageType) || 'localdisk';

console.log(`Storage Type: ${storageType}`);

const storageDir = process.env.STORAGE_DIR || path.resolve(ROOT_DIR, 'storage');

let storage: IStorageProvider;

switch (storageType) {
  case 'localdisk': {
    console.log(`Storage Dir: ${storageDir}`);

    const profilePhotosDir = path.resolve(storageDir, PROFILE_PHOTOS_BUCKET);
    if (!fs.existsSync(profilePhotosDir)) {
      fs.mkdirSync(profilePhotosDir, { recursive: true });
    }

    const messageFilesDir = path.resolve(storageDir, MESSAGE_FILES_BUCKET);
    if (!fs.existsSync(messageFilesDir)) {
      fs.mkdirSync(messageFilesDir, { recursive: true });
    }

    storage = new LocalStorageProvider(storageDir);

    break;
  }

  case 'supabase': {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl) {
      throw Error(
        'STORAGE_TYPE is set to supabase, but SUPABASE_URL is not provided!'
      );
    }

    if (!supabaseServiceRoleKey) {
      throw Error(
        'STORAGE_TYPE is set to supabase, but SUPABASE_SERVICE_ROLE_KEY is not provided!'
      );
    }

    storage = new SupabaseStorageProvider(
      createClient(supabaseUrl, supabaseServiceRoleKey)
    );
    break;
  }

  default:
    throw Error(`Invalid STORAGE_TYPE: '${storageType}'.`);
}

export default storage;

export const TEMP_FILES_STORAGE_DIR = path.resolve(storageDir, 'temp_files');

if (!fs.existsSync(TEMP_FILES_STORAGE_DIR)) {
  fs.mkdirSync(TEMP_FILES_STORAGE_DIR, { recursive: true });
}

console.log('TEMP_FILES_STORAGE_DIR:', TEMP_FILES_STORAGE_DIR);
