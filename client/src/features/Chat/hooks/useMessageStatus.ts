import { useMessageRequestsStore } from '@/store';
import { MessageRequestsState } from '@/store/useMessageRequestsStore';
import { useCallback, useMemo } from 'react';
import { useShallow } from 'zustand/shallow';

const useMessageStatus = (messageId: number, hasAttachment: boolean) => {
  const selector = useCallback(
    (state: MessageRequestsState) =>
      state.messageRequests.filter(
        (req) =>
          (req.requestType === 'MESSAGE_UPDATE' &&
            req.payload.messageId === messageId) ||
          (req.requestType === 'MESSAGE_DELETE' &&
            req.payload.message.id === messageId),
      )[0], // Just pick the frist. It is unlikely more requests exist at a time for one message,
    [messageId],
  );

  const request = useMessageRequestsStore(useShallow(selector));

  const status = useMemo(() => {
    // Pending messages status is just known to be 'sending...' or 'uploading...'.
    if (messageId < 0) {
      return hasAttachment ? 'Uploading...' : 'Sending...';
    }

    switch (request?.requestType) {
      case 'MESSAGE_UPDATE':
        return 'Updating...';

      case 'MESSAGE_DELETE':
        return 'Deleting...';

      default:
        return null;
    }
  }, [messageId, hasAttachment, request?.requestType]);

  return status;
};

export default useMessageStatus;
