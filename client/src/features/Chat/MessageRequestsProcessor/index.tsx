import { ApiError, del, post, put } from '@/api';
import { messageRequestDeleted } from '@/features/Chat/slices/messageRequestsSlice';
import {
  messageAdded,
  messageDeleted,
  messageUpdated
} from '@/features/Chat/slices/messagesSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { Message } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import useFileMessageRequestsProcessor from './useFileMessageRequestsProcessor';

const MessageRequestsProcessor = () => {
  // Getting the first request from the request Queue of messageRequests
  // File message sending requests are filtering out. they are handled in other custom hook.
  const request = useAppSelector(
    (state) =>
      state.messageRequests.filter(
        (req) => req.requestType !== 'FILE_MESSAGE_SEND'
      )[0]
  );

  // Process file message requests in parallel with the light message requests.
  useFileMessageRequestsProcessor();

  const dispatch = useAppDispatch();

  const queryKey = useMemo(() => {
    switch (request?.requestType) {
      case 'TEXT_MESSAGE_SEND':
      case 'MESSAGE_UPDATE':
        return ['/messages/text', request.requestId];

      case 'MESSAGE_DELETE':
        return ['/messages', request.requestId];

      default:
        return [''];
    }
  }, [request]);

  const queryFn = useCallback(async () => {
    if (!request) return null;
    switch (request.requestType) {
      case 'TEXT_MESSAGE_SEND':
        {
          const { receiverId, content } = request.payload;
          const message = await post<Message>('/messages/text', {
            receiverId,
            content
          });
          dispatch(messageAdded(message));
        }
        break;

      case 'MESSAGE_UPDATE':
        {
          const { messageId: id, newContent: content } = request.payload;
          const message = await put<Message>('/messages/text', { id, content });
          dispatch(messageUpdated(message));
        }
        break;

      case 'MESSAGE_DELETE':
        {
          const { messageId, deleteForReceiver } = request.payload;
          const query = deleteForReceiver ? '?deleteForReceiver=true' : '';
          await del(`/messages/${messageId}${query}`);
          dispatch(messageDeleted(messageId));
        }
        break;
    }

    dispatch(messageRequestDeleted(request.requestId));
  }, [request, dispatch]);

  const retry = useCallback((_failureCount: number, error: Error) => {
    return !(error instanceof ApiError && error.status);
  }, []);

  const { isError, error } = useQuery({ queryKey, queryFn, retry });

  if (isError) console.log('Message request error:', error);

  // This component renders nothing.
  return null;
};

export default MessageRequestsProcessor;
