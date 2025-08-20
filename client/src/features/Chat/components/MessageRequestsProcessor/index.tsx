import { messageRequestDeleted } from '@/features/Chat/slices/messageRequestsSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { Message } from '@/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import useFileMessageRequestsProcessor from './useFileMessageRequestsProcessor';
import { createAppSelector } from '@/store';
import { emitWithAck } from '@/services/socket';

// Selects the first request from the request Queue of messageRequests
// File message sending requests are filtering out. they are handled in other custom hook.
const selectRequest = createAppSelector(
  [(state) => state.messageRequests],

  (requests) =>
    requests.filter((req) => req.requestType !== 'FILE_MESSAGE_SEND')[0],
);

const MessageRequestsProcessor = () => {
  const request = useAppSelector((state) => selectRequest(state));

  const selfId = useAppSelector((state) => state.account?.id);

  const queryClient = useQueryClient();

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
          const message = await emitWithAck<Message>('send_text_message', {
            receiverId,
            content,
          });

          queryClient.setQueryData(
            ['messages', receiverId],
            (oldMessages: Message[]) => {
              if (!oldMessages) return [message];
              return [...oldMessages, message];
            },
          );
        }
        break;

      case 'MESSAGE_UPDATE':
        {
          const { messageId, newContent: content } = request.payload;
          const message = await emitWithAck<Message>('update_text_message', {
            messageId,
            content,
          });
          if (message) {
            queryClient.setQueryData(
              ['messages', message.receiverId],
              (oldMessages: Message[]) => {
                if (!oldMessages) return [];

                return oldMessages.map((oldMessage) =>
                  oldMessage.id === message.id ? message : oldMessage,
                );
              },
            );
          }
        }
        break;

      case 'MESSAGE_DELETE':
        {
          const { message, deleteForReceiver } = request.payload;
          await emitWithAck('delete_message', {
            messageId: message.id,
            deleteForReceiver,
          });
          const partnerId =
            message.senderId === selfId ? message.receiverId : message.senderId;
          queryClient.setQueryData(
            ['messages', partnerId],
            (oldMessages: Message[]) =>
              oldMessages
                ? oldMessages.filter(
                    (oldMessage) => oldMessage.id !== message.id,
                  )
                : [],
          );
        }
        break;
    }

    dispatch(messageRequestDeleted(request.requestId));

    return null; // Just prevents react query warning for not returnig data
  }, [request, dispatch, queryClient, selfId]);

  const retry = useCallback((_failureCount: number, error: Error) => {
    // return !(error instanceof ApiError && error.status);
    return false;
  }, []);

  const { isError, error } = useQuery({ queryKey, queryFn, retry });

  if (isError) console.log('Message request error:', error);

  // This component renders nothing.
  return null;
};

export default MessageRequestsProcessor;
