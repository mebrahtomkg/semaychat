import { IStorageProvider } from '@/interfaces';
import fs from 'node:fs/promises';
import path from 'node:path';

export default class LocalStorageProvider implements IStorageProvider {
  private readonly storageDir: string;

  constructor(storageDir: string) {
    this.storageDir = storageDir;
  }

  public async saveFile(bucket: string, filePath: string, fileId: number) {
    await fs.rename(
      filePath,
      path.resolve(this.storageDir, bucket, `${fileId}`)
    );
  }

  public async getFile(bucket: string, fileId: number): Promise<string> {
    return path.resolve(this.storageDir, bucket, `${fileId}`);
  }
}
