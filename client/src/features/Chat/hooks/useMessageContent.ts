import { useAppSelector } from '@/hooks';
import { useMemo } from 'react';

const useMessageContent = (
  messageId: number,
  messageContent: string | null
) => {
  // Deep filter from redux to avoid unnecessary rerender. only target this message.
  // Also just pick the frist request. It is unlikely that multiple requests happen at
  // the same time for one message.
  const [request] = useAppSelector((state) =>
    state.messageRequests.filter(
      (req) =>
        messageId > 0 &&
        req.requestType === 'MESSAGE_UPDATE' &&
        req.payload.messageId === messageId
    )
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
