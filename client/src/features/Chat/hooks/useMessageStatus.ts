import { useAppSelector } from '@/hooks';
import { useMemo } from 'react';

const useMessageStatus = (messageId: number, hasAttachment: boolean) => {
  // Deep filter from redux to avoid unnecessary rerender. only target this message.
  // Also just pick the frist request. It is unlikely that multiple requests happen at
  // the same time for one message.
  const [request] = useAppSelector((state) =>
    state.messageRequests.filter(
      (req) =>
        messageId > 0 &&
        (req.requestType === 'MESSAGE_UPDATE' ||
          req.requestType === 'MESSAGE_DELETE') &&
        req.payload.messageId === messageId
    )
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
