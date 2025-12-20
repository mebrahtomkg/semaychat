import { useMessageRequests } from '@/hooks';
import { MessageRequest } from '@/types';
import { useCallback, useMemo } from 'react';

type MessageStatus = 'sending' | 'updating' | 'deleting' | 'none';

const useMessageStatus = (messageId: number): MessageStatus => {
  const msgReqSelector = useCallback(
    (requests: MessageRequest[]) =>
      requests.filter(
        (req) =>
          (req.requestType === 'MESSAGE_UPDATE' &&
            req.payload.messageId === messageId) ||
          (req.requestType === 'MESSAGE_DELETE' &&
            req.payload.message.id === messageId),
      )[0], // Just pick the frist. It is unlikely more requests exist at a time for one message,
    [messageId],
  );

  const request = useMessageRequests(msgReqSelector);

  const status: MessageStatus = useMemo(() => {
    // Pending messages status is just known to be 'sending'
    if (messageId < 0) return 'sending';

    switch (request?.requestType) {
      case 'MESSAGE_UPDATE':
        return 'updating';

      case 'MESSAGE_DELETE':
        return 'deleting';

      default:
        return 'none';
    }
  }, [messageId, request?.requestType]);

  return status;
};

export default useMessageStatus;
