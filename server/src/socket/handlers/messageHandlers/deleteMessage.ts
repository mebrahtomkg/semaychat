import { Op } from 'sequelize';
import sequelize from '@/config/db';
import { Chat, Message } from '@/models';
import { Acknowledgement, AuthenticatedSocket } from '@/types';
import { isPositiveInteger } from '@/utils';
import { IS_PRODUCTION } from '@/constants';
import { emitToUser } from '@/socket/emitter';

interface MessageDeletePayload {
  messageId: number;
  deleteForReceiver?: boolean;
}

const deleteMessage = async (
  socket: AuthenticatedSocket,
  payload: MessageDeletePayload,
  acknowledgement: Acknowledgement
) => {
  try {
    if (!payload || typeof payload !== 'object') {
      return acknowledgement({
        status: 'error',
        message: 'Invalid message info.'
      });
    }

    const userId = socket.userId;

    const { messageId, deleteForReceiver } = payload;

    if (!isPositiveInteger(messageId)) {
      return acknowledgement({
        status: 'error',
        message: 'Invalid message id.'
      });
    }

    const transaction = await sequelize.transaction();

    try {
      const message = await Message.findByPk(messageId, {
        transaction,
        lock: transaction.LOCK.UPDATE
      });

      if (!message) {
        await transaction.rollback();
        return acknowledgement({
          status: 'error',
          message: 'Message not found.'
        });
      }

      const isSentMessage = message.senderId === userId;

      const partnerId = isSentMessage ? message.receiverId : message.senderId;

      const isDeletedSoftly = isSentMessage
        ? message.isDeletedBySender
        : message.isDeletedByReceiver;

      const isDeletedSoftlyByPartner = isSentMessage
        ? message.isDeletedByReceiver
        : message.isDeletedBySender;

      if (isDeletedSoftly) {
        await transaction.rollback();
        return acknowledgement({
          status: 'error',
          message: 'Message already deleted.'
        });
      }

      const canDelete =
        message.senderId === userId || message.receiverId === userId;

      if (!canDelete) {
        await transaction.rollback();
        return acknowledgement({
          status: 'error',
          message: 'You have no permission to delete this message.'
        });
      }

      // Find the target chat before its message ids become null
      const chat = await Chat.findOne({
        where: {
          [Op.or]: [
            { lastMessageIdForUser1: messageId },
            { lastMessageIdForUser2: messageId }
          ]
        },
        transaction,
        lock: transaction.LOCK.UPDATE
      });

      const shouldDestroy = isSentMessage
        ? message.isDeletedByReceiver || deleteForReceiver
        : message.isDeletedBySender;

      if (shouldDestroy) {
        await message.destroy({ transaction });
        // TODO: also delete the file if the message is file
      } else {
        await message.update(
          isSentMessage
            ? { isDeletedBySender: true }
            : { isDeletedByReceiver: true },
          { transaction }
        );
      }

      if (!chat) {
        await transaction.commit();

        acknowledgement({
          status: 'ok',
          message: 'Message deleted successfully.'
        });

        if (!isDeletedSoftlyByPartner) {
          emitToUser(partnerId, 'message_deleted', messageId);
        }

        return;
      }

      const { user1Id, user2Id } = chat;

      const [lastMessagesForUser1, lastMessagesForUser2] = await Promise.all([
        Message.findAll({
          where: {
            [Op.or]: [
              {
                senderId: user1Id,
                receiverId: user2Id,
                isDeletedBySender: false
              },
              {
                receiverId: user1Id,
                senderId: user2Id,
                isDeletedByReceiver: false
              }
            ]
          },
          order: [['createdAt', 'DESC']],
          limit: 1,
          transaction
        }),

        Message.findAll({
          where: {
            [Op.or]: [
              {
                senderId: user2Id,
                receiverId: user1Id,
                isDeletedBySender: false
              },
              {
                receiverId: user2Id,
                senderId: user1Id,
                isDeletedByReceiver: false
              }
            ]
          },
          order: [['createdAt', 'DESC']],
          limit: 1,
          transaction
        })
      ]);

      const lastMessageIdForUser1 = lastMessagesForUser1[0]?.id || null;
      const lastMessageIdForUser2 = lastMessagesForUser2[0]?.id || null;

      if (lastMessageIdForUser1 || lastMessageIdForUser2) {
        await chat.update(
          { lastMessageIdForUser1, lastMessageIdForUser2 },
          { transaction }
        );
      } else {
        await chat.destroy({ transaction });
      }

      await transaction.commit();

      acknowledgement({
        status: 'ok',
        message: 'Message deleted successfully.'
      });

      if (!isDeletedSoftlyByPartner) {
        emitToUser(partnerId, 'message_deleted', messageId);
      }
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (err) {
    acknowledgement({
      status: 'error',
      message: IS_PRODUCTION
        ? 'INTERNAL SERVER ERROR'
        : `INTERNAL SERVER ERROR: ${(err as Error).toString()}  ${(err as Error).stack}`
    });
  }
};

export default deleteMessage;
