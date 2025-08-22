export default interface IStorageProvider {
  saveFile(bucket: string, filePath: string, fileId: number): Promise<void>;

  getFile(bucket: string, fileId: number): Promise<Buffer | string>;

  deleteFile(bucket: string, fileId: number): Promise<void>;
}
