import { IStorageProvider } from '@/interfaces';
import { SupabaseClient } from '@supabase/supabase-js';
import { StorageEngine } from 'multer';
import { Request } from 'express';
import { getFileExtension, randomFileName } from '@/utils';
import { PassThrough } from 'node:stream';

class SupabaseStorageEngine implements StorageEngine {
  private readonly supabase: SupabaseClient;
  private readonly bucket: string;

  constructor(supabase: SupabaseClient, bucket: string) {
    this.supabase = supabase;
    this.bucket = bucket;
  }

  public async _handleFile(
    _req: Request,
    file: Express.Multer.File,
    callback: (error?: unknown, info?: Partial<Express.Multer.File>) => void,
  ) {
    try {
      const ext = getFileExtension(file.originalname);
      const filePath = `${await randomFileName()}.${ext}`;

      const passThrough = new PassThrough();

      const uploadPromise = this.supabase.storage
        .from(this.bucket)
        .upload(filePath, passThrough, {
          upsert: false, // Prevent overwriting files with the same random name
          duplex: 'half',
          contentType: file.mimetype,
        });

      let fileSize = 0;
      file.stream.on('data', (chunk) => {
        fileSize += chunk.length;
      });

      file.stream.pipe(passThrough);

      uploadPromise
        .then(({ data, error }) => {
          if (error) {
            callback(error);
            return;
          }

          if (!data) {
            callback(
              new Error('No data received from Supabase storage service!'),
            );
            return;
          }

          callback(null, {
            path: data.path,
            size: fileSize,
          });
        })
        .catch((er) => {
          callback(er);
        });
    } catch (err) {
      callback(err);
    }
  }

  public async _removeFile(
    _req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null) => void,
  ) {
    try {
      const { error } = await this.supabase.storage
        .from(this.bucket)
        .remove([file.path]);

      callback(error);
    } catch (err) {
      callback(err as Error);
    }
  }
}

export default class SupabaseStorageProvider implements IStorageProvider {
  private readonly supabase: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  public createStorageEngine(bucket: string) {
    return new SupabaseStorageEngine(this.supabase, bucket);
  }

  public async getFile(bucket: string, fileName: string) {
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .download(fileName);

    if (error) throw error;

    if (!data) {
      throw Error('No data received from Supabase download.');
    }

    const arrayBuffer = await data.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return buffer;
  }

  public async deleteFile(bucket: string, fileName: string): Promise<void> {
    const { error } = await this.supabase.storage
      .from(bucket)
      .remove([fileName]);

    if (error) throw error;
  }
}
