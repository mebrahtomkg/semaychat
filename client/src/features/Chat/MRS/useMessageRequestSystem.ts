import { useCallback, useMemo, useRef, useState } from 'react';
import {
  MessageDeleteRequest,
  MessageRequest,
  MessageSendRequest,
  MessageStatus,
  MessageUpdateRequest,
  PendingMessage
} from '../types';
import { getFileExtension } from '../utils';
import useMessageRequestsProcessor from './useMessageRequestsProcessor';
import { useAppSelector } from '@/hooks';

const useMessageRequestSystem = () => {
  const lastRequestId = useRef<number>(1);
  const lastMessageId = useRef<number>(-1);

  const selfId = useAppSelector((state) => state?.account?.id);

  const [messageRequests, setMessageRequests] = useState<MessageRequest[]>([]);

  const addMessageRequest = useCallback((req: MessageRequest) => {
    setMessageRequests((prevRequests) => [...prevRequests, req]);
  }, []);

  const deleteMessageRequest = useCallback((id: number) => {
    setMessageRequests((prevRequests) =>
      prevRequests.filter((req) => req.id !== id)
    );
  }, []);

  const sendTextMessage = useCallback(
    (receiverId: number, content: string) => {
      const req: MessageSendRequest = {
        id: lastRequestId.current++,
        type: 'send',
        payload: {
          isPending: true,
          id: lastMessageId.current--,
          senderId: selfId,
          receiverId,
          content
        }
      };
      addMessageRequest(req);
    },
    [addMessageRequest, selfId]
  );

  const sendFileMessage = useCallback(
    (receiverId: number, file: File, caption?: string) => {
      const req: MessageSendRequest = {
        id: lastRequestId.current++,
        type: 'send',
        payload: {
          isPending: true,
          id: lastMessageId.current--,
          senderId: selfId,
          receiverId,
          isFile: true,
          file: file,
          fileName: file.name,
          fileExtension: getFileExtension(file.name),
          fileSize: file.size,
          caption
        }
      };
      addMessageRequest(req);
    },
    [addMessageRequest, selfId]
  );

  const updateMessage = useCallback(
    (messageId: number, newContent: string) => {
      const req: MessageUpdateRequest = {
        id: lastRequestId.current++,
        type: 'update',
        payload: { id: messageId, content: newContent }
      };
      addMessageRequest(req);
    },
    [addMessageRequest]
  );

  const deleteMessage = useCallback(
    (messageId: number, deleteForReceiver?: boolean) => {
      const req: MessageDeleteRequest = {
        id: lastRequestId.current++,
        type: 'delete',
        payload: { id: messageId, deleteForReceiver }
      };
      addMessageRequest(req);
    },
    [addMessageRequest]
  );

  const getMessageStatus = useCallback(
    (messageId: number): MessageStatus | null => {
      const [req] = messageRequests.filter(
        (req) => req.payload.id === messageId
      );
      if (!req) return null;
      switch (req.type) {
        case 'send':
          return 'sending';
        case 'update':
          return 'updating';
        case 'delete':
          return 'deleting';
      }
    },
    [messageRequests]
  );

  const getUpdatingMessageNewContent = useCallback(
    (messageId: number): string | null => {
      const [req] = messageRequests.filter(
        (req) => req.payload.id === messageId
      );
      if (!req) return null;
      if (req.type !== 'update') return null;
      return req.payload.content;
    },
    [messageRequests]
  );

  const pendingMessages: PendingMessage[] = useMemo(
    () =>
      messageRequests
        .filter((req) => req.type === 'send')
        .map((req) => req.payload),
    [messageRequests]
  );

  useMessageRequestsProcessor(messageRequests, deleteMessageRequest);

  return {
    pendingMessages,
    sendTextMessage,
    sendFileMessage,
    updateMessage,
    deleteMessage,
    getMessageStatus,
    getUpdatingMessageNewContent
  };
};

export default useMessageRequestSystem;
