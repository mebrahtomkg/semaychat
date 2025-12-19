import { useMessageRequests } from '@/hooks';
import { Message, MessageRequest } from '@/types';
import { useCallback, useMemo } from 'react';
import { createPendingMessage } from '@/utils';

const usePendingMessages = (receiverId: number) => {
  const selector = useCallback(
    (requests: MessageRequest[]) =>
      requests.filter(
        (req) =>
          (req.requestType === 'TEXT_MESSAGE_SEND' ||
            req.requestType === 'FILE_MESSAGE_SEND') &&
          req.payload.receiver.id === receiverId,
      ),
    [receiverId],
  );

  const requests = useMessageRequests(selector);

  const pendingMessages: Message[] = useMemo(
    () => requests.map((req) => createPendingMessage(req)),
    [requests],
  );

  return pendingMessages;
};

export default usePendingMessages;
