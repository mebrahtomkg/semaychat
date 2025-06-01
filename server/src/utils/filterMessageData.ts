import { Message } from '../models';

const filterMessageData = (message: Message): Partial<Message> => {
  const {
    id,
    senderId,
    receiverId,
    content,
    createdAt,
    editedAt,
    attachment,
    isSeen
  } = message;

  return {
    id,
    senderId,
    receiverId,
    content,
    attachment,
    isSeen,
    createdAt,
    editedAt
  };
};

export default filterMessageData;
