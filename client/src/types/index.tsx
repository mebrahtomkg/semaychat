import { DarkTheme } from '../themes';

declare global {
  interface Window {
    API_URL: string;
  }
}

export interface ProfilePhoto {
  id: number;
  userId: number;
  createdAt: number;
}

export interface Account {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  bio: string;
  emailVisibility: string;
  lastSeenVisibility: string;
  profilePhotosVisibility: string;
  messageSender: string;
  profilePhoto?: ProfilePhoto;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  bio: string;
  acceptsMessage: boolean; // The user could disallowed message via privacy
  email?: string; // Could be privacy protected
  profilePhoto?: ProfilePhoto; // Could be privacy protected
  lastSeentAt?: number; // Could be privacy protected
}

export interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content?: string;
  createdAt: number;
  isFile?: boolean;
  fileName?: string;
  fileExtension?: string;
  fileSize?: number;
  caption?: string;
  file?: File;
}

export interface Chat {
  partner: User;
  lastMessage?: Message;
}

export type Theme = typeof DarkTheme;

export interface StyleProps {
  theme: Partial<Theme>;
}
