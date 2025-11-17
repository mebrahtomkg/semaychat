import { Op } from 'sequelize';
import sequelize from '@/config/db';
import { Chat, Message } from '@/models';
import deleteMessageFiles from './deleteMessageFiles';
import { sortChatUsersId } from '@/utils';

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

  const staleFiles: string[] = [];

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

    // Lock the parent Chat row to prevent concurrent updates to its lastMessageId fields.
    await Chat.findByPk(chatId, {
      transaction,
      lock: transaction.LOCK.UPDATE,
    });

    const partnerId = isSentMessage ? message.receiverId : message.senderId;

    const isDeletedByPartner = isSentMessage
      ? message.isDeletedByReceiver
      : message.isDeletedBySender;

    // Do permanent delete if the partner deleted softly the message, or if this message is
    // is sent by the user and the user also wanna delete for the receiver.
    const shouldDestroy =
      isDeletedByPartner || (isSentMessage && deleteForReceiver);

    if (shouldDestroy) {
      if (message.attachment) staleFiles.push(message.attachment.name);
      await message.destroy({ transaction });
    } else {
      await message.update(
        isSentMessage
          ? { isDeletedBySender: true }
          : { isDeletedByReceiver: true },
        { transaction },
      );
    }

    const [user1Id, user2Id] = sortChatUsersId(userId, partnerId);

    const [lastMessageForUser1, lastMessageForUser2] = await Promise.all([
      Message.findOne({
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

      Message.findOne({
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

    const lastMessageIdForUser1 = lastMessageForUser1?.id || null;
    const lastMessageIdForUser2 = lastMessageForUser2?.id || null;

    if (lastMessageIdForUser1 || lastMessageIdForUser2) {
      await Chat.update(
        { lastMessageIdForUser1, lastMessageIdForUser2 },
        {
          where: { id: chatId },
          transaction,
        },
      );
    } else {
      await Chat.destroy({
        where: { id: chatId },
        transaction,
      });
    }

    await transaction.commit();

    deleteMessageFiles(staleFiles); // no need to await

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
