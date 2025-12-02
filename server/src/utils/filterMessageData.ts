import { Attachment, Message } from '@/models';
import filterAttachmentData from './filterAttachmentData';

interface FilteredMessageData
  extends Pick<
    Message,
    | 'id'
    | 'senderId'
    | 'receiverId'
    | 'content'
    | 'isSeen'
    | 'createdAt'
    | 'editedAt'
  > {
  attachment?: Partial<Attachment>;
  parentMessage?: FilteredMessageData;
}

const filterMessageData = (message: Message): FilteredMessageData => {
  const parentMessage = message.parentMessage
    ? filterMessageData(message.parentMessage)
    : undefined;

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
    parentMessage,
  };
};

export default filterMessageData;
