import type { useMessage } from './hooks';

export interface PersistedMessage {
  id: number;
  senderId: number;
  receiverId: number;
  content?: string;
  createdAt?: number;
  isFile?: boolean;
  fileName?: string;
  fileExtension?: string;
  fileSize?: number;
  caption?: string;
  file?: File;
}

export interface PendingMessage extends PersistedMessage {
  isPending: true;
}

interface MessageRequestBase {
  id: number;
}

export interface MessageSendRequest extends MessageRequestBase {
  type: 'send';
  payload: PendingMessage;
}

export interface MessageUpdatePayload {
  id: number;
  content: string;
}

export interface MessageUpdateRequest extends MessageRequestBase {
  type: 'update';
  payload: MessageUpdatePayload;
}

export interface MessageDeletePayload {
  id: number;
  deleteForReceiver?: boolean;
}

export interface MessageDeleteRequest extends MessageRequestBase {
  type: 'delete';
  payload: MessageDeletePayload;
}

export type MessageRequest =
  | MessageSendRequest
  | MessageUpdateRequest
  | MessageDeleteRequest;

export type MessageStatus = 'sending' | 'updating' | 'deleting';

export type EnrichedMessage = ReturnType<typeof useMessage>;

export type MessageType = 'text' | 'photo' | 'audio' | 'video' | 'file';

// export type MessageOrMessageSendRequest = Message | MessageSendRequest;

// export function isMessage(
//   message: Message | PendingMessage
// ): message is Message {
//   return 'createdAt' in (message as Message);
// }

// export function isMessageSendRequest(
//   req: MessageRequest
// ): req is MessageSendRequest {
//   return req.requestType === 'send';
// }
