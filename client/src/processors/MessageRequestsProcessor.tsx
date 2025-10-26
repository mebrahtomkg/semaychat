import { useMessageRequests, useMessageUtils, useStableValue } from '@/hooks';
import { Message, MessageRequest, User } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { emitWithAck, SocketResponseError } from '@/services/socket';
import queryClient, { messagesCache } from '@/queryClient';
import { QUERY_KEY_MESSAGES } from '@/constants';
import { deleteMessageRequest } from '@/store/useMessageRequestsStore';

// Selects the first request from the request Queue of messageRequests
// File message sending requests are filtering out.
const selectFirstRequest = (requests: MessageRequest[]) =>
  requests.filter((req) => req.requestType !== 'FILE_MESSAGE_SEND')[0];

const MessageRequestsProcessor = () => {
  const request = useStableValue(useMessageRequests(selectFirstRequest));

  const { getMessagePartnerId } = useMessageUtils();

  const { mutate } = useMutation({
    mutationFn: (req: MessageRequest) => {
      const { requestType, payload } = req;

      switch (requestType) {
        case 'TEXT_MESSAGE_SEND':
          return emitWithAck<Message>('send_text_message', {
            receiverId: payload.receiver.id,
            content: payload.content,
          });

        case 'MESSAGE_UPDATE':
          return emitWithAck<Message>('update_text_message', {
            messageId: payload.messageId,
            content: payload.newContent,
          });

        case 'MESSAGE_DELETE':
          return emitWithAck('delete_message', {
            messageId: payload.message.id,
            deleteForReceiver: payload.deleteForReceiver,
          });

        case 'CHAT_DELETE':
          return emitWithAck('delete_chat', {
            chatPartnerId: payload.chatPartnerId,
            deleteForReceiver: payload.deleteForReceiver,
          });
      }

      // does not happen in reality. just for type error surpress
      return new Promise<void>((resolve) => resolve());
    },
    retry: (_failureCount: number, error: Error) => {
      // No retry if the error is normal error sent from server
      if (error instanceof SocketResponseError) {
        return false;
      }
      return true;
    },
    onError(error, req) {
      console.error(error.message);
      deleteMessageRequest(req.requestId);
    },
    onSuccess: (data, req) => {
      const { requestType, payload } = req;

      switch (requestType) {
        case 'TEXT_MESSAGE_SEND':
          messagesCache.add(data as Message, payload.receiver);
          break;

        case 'MESSAGE_UPDATE':
          messagesCache.update(data as Message);
          break;

        case 'MESSAGE_DELETE':
          {
            const { message } = payload;
            const partnerId = getMessagePartnerId(message);
            messagesCache.remove(partnerId, message.id);
          }
          break;

        case 'CHAT_DELETE':
          queryClient.setQueryData(
            [QUERY_KEY_MESSAGES, payload.chatPartnerId],
            [],
          );
          break;
      }
      deleteMessageRequest(req.requestId);
    },
  });

  useEffect(() => {
    if (request) {
      mutate(request);
    }
  }, [request, mutate]);

  return null; // Renders Nothing.
};

export default MessageRequestsProcessor;
