import { FILES_STORAGE_TYPE, FILES_STORAGE_TYPE_OPTIONS } from '@/constants';
import { IStorageProvider } from '@/interfaces';
import { LocalStorageProvider, SupabaseStorageProvider } from '@/providers';

class StorageService implements IStorageProvider {
  private readonly storageProvider: IStorageProvider;

  constructor() {
    switch (FILES_STORAGE_TYPE) {
      case FILES_STORAGE_TYPE_OPTIONS.localdisk:
        this.storageProvider = new LocalStorageProvider();
        break;

      case FILES_STORAGE_TYPE_OPTIONS.supabase:
        this.storageProvider = new SupabaseStorageProvider();
        break;

      default:
        throw Error(
          `Invalid FILES_STORAGE_TYPE: ${FILES_STORAGE_TYPE}. FILES_STORAGE_TYPE must be '${
            FILES_STORAGE_TYPE_OPTIONS.localdisk
          }' or '${FILES_STORAGE_TYPE_OPTIONS.supabase}'.`
        );
    }
  }

  public async saveFile(
    bucket: string,
    filePath: string,
    fileId: number
  ): Promise<void> {
    await this.storageProvider.saveFile(bucket, filePath, fileId);
  }

  public async getFile(
    bucket: string,
    fileId: number
  ): Promise<Buffer | string> {
    return await this.storageProvider.getFile(bucket, fileId);
  }
}

const storageService = new StorageService();

export default storageService;
