import sequelize from '@/config/db';
import { Message } from '@/models';
import { filterMessageData } from '@/utils';

export class MessageEditError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MessageEditError';
  }
}

interface MessageEditProps {
  userId: number;
  messageId: number;
  content: string;
}

const editMessage = async ({
  userId,
  messageId,
  content,
}: MessageEditProps) => {
  const transaction = await sequelize.transaction();

  try {
    const message = await Message.findByPk(messageId, {
      transaction,
      // Lock the message row to prevent concurrent updates
      lock: transaction.LOCK.UPDATE,
    });

    if (!message) {
      throw new MessageEditError('Message not found.');
    }

    if (message.senderId !== userId) {
      throw new MessageEditError(
        'You have no permission to edit this message.',
      );
    }

    if (message.attachmentId) {
      throw new MessageEditError('File message cannot be edited.');
    }

    const trimmedContent = content.trim();

    if (!trimmedContent) {
      throw new MessageEditError('Invalid message content.');
      // Also Check content for xss security, filter it.
    }

    await message.update(
      {
        content,
        editedAt: Date.now(),
      },
      { transaction },
    );

    await transaction.commit();

    // Since only sent messages can be edited, the partner is always the receiver.
    return {
      // Notify user only if he/she did not delete the message.
      shouldNotifyPartner: !message.isDeletedByReceiver,
      partnerId: message.receiverId,
      updatedMessage: filterMessageData(message),
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export default editMessage;
