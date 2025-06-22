import { useAppSelector } from '@/hooks';
import { createAppSelector } from '@/store';
import { useMemo } from 'react';

// Deep filter from redux to avoid unnecessary rerender. only search the target message.
// Also just pick the frist request. It is unlikely that multiple requests happen at
// the same time for one message.
const selectTargetRequest = createAppSelector(
  [(state) => state.messageRequests, (_state, messageId: number) => messageId],

  (requests, messageId) =>
    requests.filter(
      (req) =>
        messageId > 0 &&
        req.requestType === 'MESSAGE_UPDATE' &&
        req.payload.messageId === messageId
    )[0]
);

const useMessageContent = (
  messageId: number,
  messageContent: string | null
) => {
  const request = useAppSelector((state) =>
    selectTargetRequest(state, messageId)
  );

  const content = useMemo(
    () =>
      request?.requestType === 'MESSAGE_UPDATE'
        ? request.payload.newContent
        : messageContent,
    [request, messageContent]
  );

  return content;
};

export default useMessageContent;
