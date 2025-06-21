import { useAppSelector } from '@/hooks';
import { Message } from '@/types';
import { useMemo } from 'react';
import { getFileExtension } from '../utils';

const usePendingMessages = (receiverId: number) => {
  const selfId = useAppSelector((state) => state.account?.id);

  // Deep filter from redux to avoid unnecessary rerender.
  const requests = useAppSelector((state) =>
    state.messageRequests.filter(
      (req) =>
        (req.requestType === 'TEXT_MESSAGE_SEND' ||
          req.requestType === 'FILE_MESSAGE_SEND') &&
        req.payload.receiverId === receiverId
    )
  );

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
        isSeen: false
      };

      if (req.requestType === 'FILE_MESSAGE_SEND') {
        const { file, caption } = req.payload;
        message.attachment = {
          id: 0, // Not usefull at frontend
          name: file.name,
          extension: getFileExtension(file.name) || '',
          caption,
          size: file.size,
          file
        };
      }

      return message;
    });
  }, [receiverId, requests, selfId]);

  return pendingMessages;
};

export default usePendingMessages;
