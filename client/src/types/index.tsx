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
  name: string;
  size: number;
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
  isOnline: boolean;
  email?: string; // Could be privacy protected
  profilePhoto?: ProfilePhoto; // Could be privacy protected
  lastSeenAt?: number; // Could be privacy protected
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
  parentMessage?: Message;
}

export interface Chat {
  partner: User;
  lastMessage?: Message;
  unseenMessagesCount?: number;
}

interface BaseMessageRequest {
  requestId: number;
  requestType:
    | 'TEXT_MESSAGE_SEND'
    | 'FILE_MESSAGE_SEND'
    | 'MESSAGE_UPDATE'
    | 'MESSAGE_DELETE'
    | 'CHAT_DELETE'
    | 'MESSAGE_MARK_AS_READ';
  payload: object;
}

export interface TextMessageSendRequest extends BaseMessageRequest {
  requestType: 'TEXT_MESSAGE_SEND';
  payload: {
    receiver: User;
    content: string;
    parentMessageId?: number;
  };
}

export interface FileMessageSendRequest extends BaseMessageRequest {
  requestType: 'FILE_MESSAGE_SEND';
  payload: {
    receiver: User;
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

export interface ChatDeleteRequest extends BaseMessageRequest {
  requestType: 'CHAT_DELETE';
  payload: {
    chatPartnerId: number;
    deleteForReceiver?: boolean;
  };
}

export interface MessageMarkAsReadRequest extends BaseMessageRequest {
  requestType: 'MESSAGE_MARK_AS_READ';
  payload: {
    chatPartnerId: number;
    messageId: number;
  };
}

export type MessageRequest =
  | TextMessageSendRequest
  | FileMessageSendRequest
  | MessageUpdateRequest
  | MessageDeleteRequest
  | ChatDeleteRequest
  | MessageMarkAsReadRequest;
