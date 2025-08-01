import { FILES_STORAGE_DIR } from '@/constants';
import { IStorageProvider } from '@/interfaces';
import fs from 'node:fs/promises';
import path from 'node:path';

export default class LocalStorageProvider implements IStorageProvider {
  public async saveFile(bucket: string, filePath: string, fileId: number) {
    await fs.rename(
      filePath,
      path.resolve(FILES_STORAGE_DIR, bucket, `${fileId}`)
    );
  }

  public async getFile(bucket: string, fileId: number): Promise<string> {
    return path.resolve(FILES_STORAGE_DIR, bucket, `${fileId}`);
  }
}
