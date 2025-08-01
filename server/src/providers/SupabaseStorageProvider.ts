import { IStorageProvider } from '@/interfaces';
import fs from 'node:fs/promises';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export default class SupabaseStorageProvider implements IStorageProvider {
  private readonly supabase: SupabaseClient;

  constructor() {
    if (!process.env.SUPABASE_URL) {
      throw Error('SUPABASE_URL cannot be empty.');
    }

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw Error('SUPABASE_SERVICE_ROLE_KEY cannot be empty.');
    }

    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
  }

  public async saveFile(bucket: string, filePath: string, fileId: number) {
    const fileBuffer = await fs.readFile(filePath);

    const { data, error } = await this.supabase.storage
      .from(bucket)
      .upload(`${fileId}`, fileBuffer);

    if (error) throw Error(`Supabase Storage Error: ${error.message}`);
  }

  public async getFile(bucket: string, fileId: number) {
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .download(`${fileId}`);

    if (error) throw Error(`Storage Error: ${error.message}`);

    if (!data) {
      throw Error('No data received from Supabase download.');
    }

    const arrayBuffer = await data.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return buffer;
  }
}
