import { IStorageProvider } from '@/interfaces';
import { SupabaseClient } from '@supabase/supabase-js';
import { Response } from 'express';
import { Readable } from 'node:stream';
import mime from 'mime-types';
import { pipeline } from 'node:stream/promises';
import { SupabaseStorageEngine } from '@/storageEngines';

export default class SupabaseStorageProvider implements IStorageProvider {
  private readonly supabase: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  public createStorageEngine(bucket: string) {
    return new SupabaseStorageEngine(this.supabase, bucket);
  }

  public async serveFile(
    bucket: string,
    fileName: string,
    res: Response,
    headers?: Record<string, string>,
  ): Promise<void> {
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .download(fileName);

    if (error) throw error;

    if (!data) {
      throw Error('No data received from Supabase download.');
    }

    // Convert Web ReadableStream to Node.js Readable Stream
    // biome-ignore lint/suspicious/noExplicitAny: support typing
    const stream = Readable.fromWeb(data.stream() as any);

    res.setHeader(
      'Content-Type',
      mime.lookup(fileName) || 'application/octet-stream',
    );

    res.setHeader('Content-Disposition', `inline; filename="${fileName}"`);

    res.setHeader('Content-Length', data.size);

    if (headers) {
      for (const [key, value] of Object.entries(headers)) {
        res.setHeader(key, value);
      }
    }

    // Pipe the Readable Stream to the HTTP Response
    await pipeline(stream, res);
  }

  public async deleteFile(bucket: string, fileName: string): Promise<void> {
    const { error } = await this.supabase.storage
      .from(bucket)
      .remove([fileName]);

    if (error) throw error;
  }
}
