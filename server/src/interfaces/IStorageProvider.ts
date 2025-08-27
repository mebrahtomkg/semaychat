import { Response } from 'express';
import { StorageEngine } from 'multer';

export default interface IStorageProvider {
  createStorageEngine(bucket: string): StorageEngine;

  serveFile(
    bucket: string,
    fileName: string,
    res: Response,
    headers?: Record<string, string>,
  ): Promise<void>;

  getFile(bucket: string, fileName: string): Promise<Buffer | string>;

  deleteFile(bucket: string, fileName: string): Promise<void>;
}
