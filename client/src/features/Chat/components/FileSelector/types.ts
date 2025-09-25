export interface LocalAttachment {
  id: number;
  file: File;
  displayName: string;
  isImage: boolean;
  width?: number;
  height?: number;
  caption?: string;
}
