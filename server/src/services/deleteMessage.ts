import { Op } from 'sequelize';
import sequelize from '@/config/db';
import { Chat, Message } from '@/models';
import { MESSAGE_FILES_BUCKET } from '@/config/general';
import storage from '@/config/storage';

export class MessageDeleteError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MessageDeleteError';
  }
}

interface MessageDeleteProps {
  userId: number;
  messageId: number;
  deleteForReceiver?: boolean;
}

const deleteMessage = async ({
  userId,
  messageId,
  deleteForReceiver,
}: MessageDeleteProps) => {
  const transaction = await sequelize.transaction();

  try {
    const message = await Message.scope('withAttachment').findByPk(messageId, {
      transaction,
      lock: transaction.LOCK.UPDATE,
    });

    if (!message) {
      throw new MessageDeleteError('Message not found.');
    }

    // Whether the user is sender or receiver of this message
    const isUserSenderOrReceiver =
      message.senderId === userId || message.receiverId === userId;

    if (!isUserSenderOrReceiver) {
      throw new MessageDeleteError(
        'You have no permission to delete this message.',
      );
    }

    const isSentMessage = message.senderId === userId;

    const isDeleted = isSentMessage
      ? message.isDeletedBySender
      : message.isDeletedByReceiver;

    if (isDeleted) {
      throw new MessageDeleteError('Message already deleted.');
    }

    const { chatId } = message;

    const partnerId = isSentMessage ? message.receiverId : message.senderId;

    const isDeletedByPartner = isSentMessage
      ? message.isDeletedByReceiver
      : message.isDeletedBySender;

    // Do permanent delete if the partner deleted softly the message, or if this message is
    // is sent by the user and the user also wanna delete for the receiver.
    const shouldDestroy =
      isDeletedByPartner || (isSentMessage && deleteForReceiver);

    if (shouldDestroy) {
      if (message.attachment) {
        await storage.deleteFile(MESSAGE_FILES_BUCKET, message.attachment.name);
      }

      await message.destroy({ transaction });
    } else {
      await message.update(
        isSentMessage
          ? { isDeletedBySender: true }
          : { isDeletedByReceiver: true },
        { transaction },
      );
    }

    const chat = await Chat.findByPk(chatId, {
      transaction,
      lock: transaction.LOCK.UPDATE,
    });

    if (!chat) {
      throw new Error('A message without chat found! this should not happen');
    }

    const { user1Id, user2Id } = chat;

    const [lastMessagesForUser1, lastMessagesForUser2] = await Promise.all([
      Message.findAll({
        where: {
          chatId,
          [Op.or]: [
            {
              senderId: user1Id,
              receiverId: user2Id,
              isDeletedBySender: false,
            },
            {
              receiverId: user1Id,
              senderId: user2Id,
              isDeletedByReceiver: false,
            },
          ],
        },
        order: [['createdAt', 'DESC']],
        limit: 1,
        transaction,
      }),

      Message.findAll({
        where: {
          chatId,
          [Op.or]: [
            {
              senderId: user2Id,
              receiverId: user1Id,
              isDeletedBySender: false,
            },
            {
              receiverId: user2Id,
              senderId: user1Id,
              isDeletedByReceiver: false,
            },
          ],
        },
        order: [['createdAt', 'DESC']],
        limit: 1,
        transaction,
      }),
    ]);

    const lastMessageIdForUser1 = lastMessagesForUser1[0]?.id || null;
    const lastMessageIdForUser2 = lastMessagesForUser2[0]?.id || null;

    if (lastMessageIdForUser1 || lastMessageIdForUser2) {
      await chat.update(
        { lastMessageIdForUser1, lastMessageIdForUser2 },
        { transaction },
      );
    } else {
      await chat.destroy({ transaction });
    }

    await transaction.commit();

    return {
      // Notify partner only if he/she did not delete the message and if the message is
      // deleted permanently
      shouldNotifyPartner: !isDeletedByPartner && deleteForReceiver,
      partnerId,
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export default deleteMessage;
