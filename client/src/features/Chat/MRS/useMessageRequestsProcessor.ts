import { useCallback, useEffect, useState } from 'react';
import { useAPI } from '../../../hooks';
import {
  messageAdded,
  messageDeleted,
  messageUpdated
} from '../slices/messagesSlice';
import {
  MessageDeletePayload,
  MessageRequest,
  MessageSendRequest,
  MessageUpdatePayload,
  PendingMessage
} from '../types';
import { useDispatch } from 'react-redux';
import { Message } from '@/types';

const useMessageRequestsProcessor = (
  messageRequests: MessageRequest[],
  deleteMessageRequest: (id: number) => void
): void => {
  const { post, put, del } = useAPI();

  const dispatch = useDispatch();

  const sendMessage = useCallback(
    async (message: PendingMessage, requestId: number) => {
      const { receiverId, content, isFile, file, caption } = message;

      const endpoint = isFile ? '/messages/file' : '/messages';

      let body: FormData | { receiverId: number; content: string };
      if (isFile) {
        body = new FormData();
        body.append('receiverId', `${receiverId}`);
        if (caption) body.append('caption', caption);
        if (file) body.append('messageFile', file);
      } else {
        body = { receiverId, content };
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      const {
        success,
        data,
        message: apiMessage
      } = await post<Message>(endpoint, body);

      if (success) {
        dispatch(messageAdded(data));
      } else {
        console.error(apiMessage);
      }
      deleteMessageRequest(requestId);
    },
    [post, deleteMessageRequest, dispatch]
  );

  const updateMessage = useCallback(
    async ({ id, content }: MessageUpdatePayload, requestId: number) => {
      const body = { id, content };

      await new Promise((resolve) => setTimeout(resolve, 1000));
      const { success, data, message } = await put<Message>('/messages', body);

      if (success) {
        dispatch(messageUpdated(data));
      } else {
        console.error(message);
      }
      deleteMessageRequest(requestId);
    },
    [put, deleteMessageRequest, dispatch]
  );

  const deleteMessage = useCallback(
    async (
      { id, deleteForReceiver }: MessageDeletePayload,
      requestId: number
    ) => {
      const query = deleteForReceiver ? '?deleteForReceiver=true' : '';

      await new Promise((resolve) => setTimeout(resolve, 1000));
      const { success, message } = await del(`/messages/${id}${query}`);

      if (success) {
        dispatch(messageDeleted(id));
      } else {
        console.error(message);
      }
      deleteMessageRequest(requestId);
    },
    [del, deleteMessageRequest, dispatch]
  );

  const [isProcessingRequest, setIsProcessingRequest] = useState(false);

  const processRequest = useCallback(
    async (req: MessageRequest) => {
      if (isProcessingRequest) return;
      setIsProcessingRequest(true);
      switch (req.type) {
        case 'send':
          await sendMessage(req.payload, req.id);
          break;

        case 'update':
          await updateMessage(req.payload, req.id);
          break;

        case 'delete':
          await deleteMessage(req.payload, req.id);
          break;
      }
      setIsProcessingRequest(false);
    },
    [deleteMessage, isProcessingRequest, sendMessage, updateMessage]
  );

  useEffect(() => {
    const [req] = messageRequests;
    if (req && !isProcessingRequest) processRequest(req);
  }, [isProcessingRequest, processRequest, messageRequests]);
};

export default useMessageRequestsProcessor;
