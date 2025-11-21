import { Op } from 'sequelize';
import { Message } from '@/models';

export class MessageMarkAsReadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MessageMarkAsReadError';
  }
}

interface MessageMarkAsReadProps {
  userId: number;
  chatPartnerId: number;
  messageId: number;
}

const markMessageAsRead = async ({
  userId,
  chatPartnerId,
  messageId,
}: MessageMarkAsReadProps) => {
  await Message.update(
    { isSeen: true },
    {
      where: {
        receiverId: userId,
        senderId: chatPartnerId,
        isSeen: false,
        id: {
          [Op.lte]: messageId,
        },
      },
    },
  );

  const unseenMessagesCount = await Message.count({
    where: {
      receiverId: userId,
      senderId: chatPartnerId,
      isSeen: false,
    },
  });

  return { unseenMessagesCount };
};

export default markMessageAsRead;
