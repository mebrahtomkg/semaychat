import { useAccount } from '@/hooks';
import { Message, MessageRequest } from '@/types';
import { useCallback, useMemo } from 'react';
import { getMessageRequestFile } from '@/services/messageRequestFilesStore';
import { useShallow } from 'zustand/shallow';
import useMessageRequestsStore from '@/store/useMessageRequestsStore';

const usePendingMessages = (receiverId: number) => {
  const { id: selfId } = useAccount();

  const targetRequestsSelector = useCallback(
    (requests: MessageRequest[]) =>
      requests.filter(
        (req) =>
          (req.requestType === 'TEXT_MESSAGE_SEND' ||
            req.requestType === 'FILE_MESSAGE_SEND') &&
          req.payload.receiverId === receiverId,
      ),
    [receiverId],
  );

  const requests = useMessageRequestsStore(useShallow(targetRequestsSelector));

  const pendingMessages: Message[] = useMemo(() => {
    return requests.map((req) => {
      const message: Message = {
        // Use negative number to avoid id conflict with the persisted in server messages
        id: -1 * req.requestId,
        receiverId: receiverId,
        senderId: selfId as number,
        content:
          req.requestType === 'TEXT_MESSAGE_SEND' ? req.payload.content : null,
        createdAt: 0,
        editedAt: 0,
        isSeen: false,
      };

      if (req.requestType === 'FILE_MESSAGE_SEND') {
        const { fileId, width, height, caption } = req.payload;
        const file = getMessageRequestFile(fileId);
        if (file) {
          message.attachment = {
            id: 0, // Not usefull at frontend
            name: file.name,
            width,
            height,
            caption,
            size: file.size,
            file,
          };
        }
      }

      return message;
    });
  }, [receiverId, requests, selfId]);

  return pendingMessages;
};

export default usePendingMessages;
