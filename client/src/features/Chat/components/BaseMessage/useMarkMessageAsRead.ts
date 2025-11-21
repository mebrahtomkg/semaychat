import { addMessageMarkAsReadRequest } from '@/store/useMessageRequestsStore';
import { Message } from '@/types';
import { useEffect } from 'react';

const useMarkMessageAsRead = (message: Message) => {
  useEffect(() => {
    if (!message.isSeen) {
      addMessageMarkAsReadRequest({
        chatPartnerId: message.senderId,
        messageId: message.id,
      });
    }
  }, [message]);
};

export default useMarkMessageAsRead;
