import { useMessageRequests } from '@/hooks';
import { Chat, MessageRequest } from '@/types';
import { useCallback, useMemo } from 'react';
import { createPendingMessage } from '@/utils';

const useLastMessage = (chat: Chat) => {
  const { partner, lastMessage } = chat;

  const partnerId = partner.id;

  const lastMsgSendReqSelector = useCallback(
    (requests: MessageRequest[]) =>
      requests
        .filter(
          (req) =>
            (req.requestType === 'TEXT_MESSAGE_SEND' ||
              req.requestType === 'FILE_MESSAGE_SEND') &&
            req.payload.receiver.id === partnerId,
        )
        .pop(), // We only want the last
    [partnerId],
  );

  const lastMsgSendReq = useMessageRequests(lastMsgSendReqSelector);

  const pendingMessage = useMemo(
    () => (lastMsgSendReq ? createPendingMessage(lastMsgSendReq) : undefined),
    [lastMsgSendReq],
  );

  return pendingMessage || lastMessage;
};

export default useLastMessage;
