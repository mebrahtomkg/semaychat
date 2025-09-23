export interface LocalAttachment {
  id: number;
  file: File;
  isImage: boolean;
  displayName: string;
  caption?: string;
}
