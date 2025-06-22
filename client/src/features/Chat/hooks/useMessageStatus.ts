import { useAppSelector } from '@/hooks';
import { createAppSelector } from '@/store';
import { useMemo } from 'react';

const selectTargetMessageRequest = createAppSelector(
  [(state) => state.messageRequests, (_state, messageId: number) => messageId],

  (requests, messageId) =>
    requests.filter(
      (req) =>
        messageId > 0 &&
        (req.requestType === 'MESSAGE_UPDATE' ||
          req.requestType === 'MESSAGE_DELETE') &&
        req.payload.messageId === messageId
    )[0] // Just pick the frist. It is unlikely more requests exist at a time for one message
);

const useMessageStatus = (messageId: number, hasAttachment: boolean) => {
  const request = useAppSelector((state) =>
    selectTargetMessageRequest(state, messageId)
  );

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
