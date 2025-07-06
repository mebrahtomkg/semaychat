import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs/promises';

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export default supabase;

export const uploadFile = async (
  bucket: string,
  filePath: string,
  id: number
) => {
  const fileBuffer = await fs.readFile(filePath);

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(`${id}`, fileBuffer);

  if (error) throw Error(`Storage Error: ${error.message}`);

  return data;
};

export const downloadFile = async (bucket: string, id: number) => {
  const { data, error } = await supabase.storage.from(bucket).download(`${id}`);

  if (error) throw Error(`Storage Error: ${error.message}`);

  return data;
};
