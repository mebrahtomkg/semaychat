declare global {
  interface Window {
    API_URL: string;
    SERVICE_WORKER_URL: string;
  }
}

export type Theme = 'dark' | 'light';

export type VisibilityOption = 'everybody' | 'contacts' | 'nobody';

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
  emailVisibility: VisibilityOption;
  lastSeenVisibility: VisibilityOption;
  profilePhotosVisibility: VisibilityOption;
  messageSender: VisibilityOption;
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

export interface Attachment {
  id: number;
  name: string;
  size: number;
  width: number | null | undefined;
  height: number | null | undefined;
  caption: string | null | undefined;
  file?: File; // Only exists on frontend
}

export interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string | null;
  isSeen: boolean;
  createdAt: number;
  editedAt: number;
  attachment?: Attachment;
}

export interface Chat {
  partner: User;
  lastMessage?: Message;
}

interface BaseMessageRequest {
  requestId: number;
  requestType:
    | 'TEXT_MESSAGE_SEND'
    | 'FILE_MESSAGE_SEND'
    | 'MESSAGE_UPDATE'
    | 'MESSAGE_DELETE';
  payload: object;
}

export interface TextMessageSendRequest extends BaseMessageRequest {
  requestType: 'TEXT_MESSAGE_SEND';
  payload: {
    receiverId: number;
    content: string;
  };
}

export interface FileMessageSendRequest extends BaseMessageRequest {
  requestType: 'FILE_MESSAGE_SEND';
  payload: {
    receiverId: number;
    fileId: number;
    caption?: string;
    width?: number;
    height?: number;
  };
}

export interface MessageUpdateRequest extends BaseMessageRequest {
  requestType: 'MESSAGE_UPDATE';
  payload: {
    messageId: number;
    newContent: string;
  };
}

export interface MessageDeleteRequest extends BaseMessageRequest {
  requestType: 'MESSAGE_DELETE';
  payload: {
    message: Message;
    deleteForReceiver?: boolean;
  };
}

export type MessageRequest =
  | TextMessageSendRequest
  | FileMessageSendRequest
  | MessageUpdateRequest
  | MessageDeleteRequest;
