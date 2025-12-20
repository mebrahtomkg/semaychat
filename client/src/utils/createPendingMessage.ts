import { accountCache } from '@/queryClient';
import { getMessageRequestFile } from '@/services/messageRequestFilesStore';
import { Message, MessageRequest } from '@/types';

const createPendingMessage = (req: MessageRequest) => {
  if (
    !(
      req.requestType === 'TEXT_MESSAGE_SEND' ||
      req.requestType === 'FILE_MESSAGE_SEND'
    )
  ) {
    throw new Error(
      'Cannot create pending message. invalid message request type',
    );
  }

  const account = accountCache.get();

  const receiverId = req.payload.receiver.id;

  const message: Message = {
    // Use negative number to avoid id conflict with the persisted in server messages
    id: -1 * req.requestId,
    receiverId: receiverId,
    senderId: account.id,
    content:
      req.requestType === 'TEXT_MESSAGE_SEND' ? req.payload.content : null,
    createdAt: req.timestamp,
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
};

export default createPendingMessage;
