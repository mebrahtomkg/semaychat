import { Message } from '@/models';
import filterAttachmentData from './filterAttachmentData';

const filterMessageData = (message: Message) => {
  const attachment = message.attachment
    ? filterAttachmentData(message.attachment)
    : undefined;

  const { id, senderId, receiverId, content, createdAt, editedAt, isSeen } =
    message.toJSON();

  return {
    id,
    senderId,
    receiverId,
    content,
    isSeen,
    createdAt,
    editedAt,
    attachment,
  };
};

export default filterMessageData;
