import { useAccount } from '@/hooks';
import { Message } from '@/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import useFileMessageRequestsProcessor from './useFileMessageRequestsProcessor';
import { useMessageRequestsStore } from '@/store';
import { emitWithAck } from '@/services/socket';
import { useShallow } from 'zustand/shallow';
import { MessageRequestsState } from '@/store/useMessageRequestsStore';

const MessageRequestsProcessor = () => {
  // Selects the first request from the request Queue of messageRequests
  // File message sending requests are filtering out. they are handled in other custom hook.
  const selector = useCallback(
    (state: MessageRequestsState) =>
      state.messageRequests.filter(
        (req) => req.requestType !== 'FILE_MESSAGE_SEND',
      )[0],
    [],
  );

  const request = useMessageRequestsStore(useShallow(selector));

  const deleteMessageRequest = useMessageRequestsStore(
    (state) => state.deleteMessageRequest,
  );

  const { id: selfId } = useAccount();

  const queryClient = useQueryClient();

  // Process file message requests in parallel with the light message requests.
  useFileMessageRequestsProcessor();

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

    deleteMessageRequest(request.requestId);

    return null; // Just prevents react query warning for not returnig data
  }, [request, deleteMessageRequest, queryClient, selfId]);

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
