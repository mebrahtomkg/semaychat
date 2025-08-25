import { IStorageProvider } from '@/interfaces';
import { getFileExtension, randomFileName } from '@/utils';
import { Request } from 'express';
import { StorageEngine } from 'multer';
import fsSync from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';

class LocalStorageEngine implements StorageEngine {
  private readonly storageDir: string;
  private readonly bucket: string;

  constructor(storageDir: string, bucket: string) {
    this.storageDir = storageDir;
    this.bucket = bucket;
  }

  public async _handleFile(
    _req: Request,
    file: Express.Multer.File,
    callback: (error?: unknown, info?: Partial<Express.Multer.File>) => void,
  ) {
    try {
      const fileName = await randomFileName();

      const filePath = path.resolve(
        this.storageDir,
        this.bucket,
        `${fileName}.${getFileExtension(file.originalname)}`,
      );

      const outStream = fsSync.createWriteStream(filePath);

      file.stream.pipe(outStream);
      outStream.on('error', async (err) => {
        // Delete the incomplete file on error.
        try {
          await fs.unlink(filePath);
        } catch (_err) {}
        callback(err);
      });

      outStream.on('finish', () => {
        callback(null, {
          path: filePath,
          size: outStream.bytesWritten,
        });
      });
    } catch (err) {
      callback(err as Error);
    }
  }

  public async _removeFile(
    _req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null) => void,
  ) {
    try {
      await fs.unlink(file.path);
      callback(null);
    } catch (err) {
      callback(err as Error);
    }
  }
}

export default class LocalStorageProvider implements IStorageProvider {
  private readonly storageDir: string;

  constructor(storageDir: string) {
    this.storageDir = storageDir;
  }

  public createStorageEngine(bucket: string) {
    return new LocalStorageEngine(this.storageDir, bucket);
  }

  public async getFile(
    bucket: string,
    fileName: string,
  ): Promise<Buffer | string> {
    return path.resolve(this.storageDir, bucket, fileName);
  }

  public async deleteFile(bucket: string, fileName: string): Promise<void> {
    const filePath = path.resolve(this.storageDir, bucket, fileName);
    await fs.unlink(filePath);
  }
}
