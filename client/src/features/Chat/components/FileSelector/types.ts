export interface Attachment {
    id: number;
    file: File;
    isImage: boolean;
    displayName: string;
    caption?: string;
  }