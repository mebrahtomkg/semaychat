import { IStorageProvider } from '@/interfaces';
import { LocalStorageEngine } from '@/storageEngines';
import { Response } from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';

export default class LocalStorageProvider implements IStorageProvider {
  private readonly storageDir: string;

  constructor(storageDir: string) {
    this.storageDir = storageDir;
  }

  public createStorageEngine(bucket: string) {
    return new LocalStorageEngine(this.storageDir, bucket);
  }

  public async serveFile(
    bucket: string,
    fileName: string,
    res: Response,
    headers?: Record<string, string>,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const filePath = path.resolve(this.storageDir, bucket, fileName);

      res.status(200).sendFile(filePath, { headers }, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  public async deleteFile(bucket: string, fileName: string): Promise<void> {
    const filePath = path.resolve(this.storageDir, bucket, fileName);
    await fs.unlink(filePath);
  }
}
