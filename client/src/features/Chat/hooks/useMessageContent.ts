import { useMessageRequestsStore } from '@/store';
import { MessageRequestsState } from '@/store/useMessageRequestsStore';
import { MessageUpdateRequest } from '@/types';
import { useCallback, useMemo } from 'react';
import { useShallow } from 'zustand/shallow';

const useMessageContent = (
  messageId: number,
  messageContent: string | null,
) => {
  // Doing deep filter from the store to avoid unnecessary rerender. only search the target message.
  // Also just pick the frist request. It is unlikely that multiple requests happen at
  // the same time for one message.
  const selector = useCallback(
    (state: MessageRequestsState) =>
      state.messageRequests.filter(
        (req) =>
          req.requestType === 'MESSAGE_UPDATE' &&
          req.payload.messageId === messageId,
      )[0],
    [messageId],
  );

  const request = useMessageRequestsStore(useShallow(selector));

  const content = useMemo(
    () =>
      messageId > 0 && request
        ? (request as MessageUpdateRequest).payload.newContent
        : messageContent,
    [messageId, request, messageContent],
  );

  return content;
};

export default useMessageContent;
