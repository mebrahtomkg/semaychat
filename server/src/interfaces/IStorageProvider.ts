import { StorageEngine } from 'multer';

export default interface IStorageProvider {
  createStorageEngine(bucket: string): StorageEngine;

  getFile(bucket: string, fileName: string): Promise<Buffer | string>;

  deleteFile(bucket: string, fileName: string): Promise<void>;
}
