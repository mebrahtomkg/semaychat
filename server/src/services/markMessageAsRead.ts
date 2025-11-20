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
        senderId: chatPartnerId,
        receiverId: userId,
        id: {
          [Op.lte]: messageId,
        },
      },
    },
  );
};

export default markMessageAsRead;
