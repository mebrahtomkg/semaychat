import { IStorageProvider } from '@/interfaces';
import fs from 'node:fs/promises';
import { SupabaseClient } from '@supabase/supabase-js';

export default class SupabaseStorageProvider implements IStorageProvider {
  private readonly supabase: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
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
