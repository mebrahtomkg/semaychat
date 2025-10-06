import { Op } from 'sequelize';
import sequelize from '@/config/db';
import { Chat, Message } from '@/models';
import { Acknowledgement, AuthenticatedSocket } from '@/types';
import { isPositiveInteger, sortChatUsersId } from '@/utils';
import { emitToUser } from '@/socket/emitter';
import { IS_PRODUCTION } from '@/config/general';
import deleteMessageFiles from './deleteMessageFiles';
import cleanupChatMessages from './cleanupChatMessages';

interface ChatDeletePayload {
  chatPartnerId: number;
  deleteForReceiver?: boolean;
}

const deleteChat = async (
  socket: AuthenticatedSocket,
  payload: ChatDeletePayload,
  acknowledgement: Acknowledgement,
) => {
  try {
    if (!payload || typeof payload !== 'object') {
      return acknowledgement({
        status: 'error',
        message: 'Invalid chat info.',
      });
    }

    const userId = socket.userId as number;
    const { chatPartnerId, deleteForReceiver } = payload;

    if (!isPositiveInteger(chatPartnerId)) {
      return acknowledgement({
        status: 'error',
        message: 'Invalid chat partner id.',
      });
    }

    let staleFiles: string[] = [];
    const transaction = await sequelize.transaction();

    try {
      // #1 Process sent messages.
      // Effect of deleteForReceiver option is only on sent messages!
      if (deleteForReceiver) {
        const where = {
          senderId: userId,
          receiverId: chatPartnerId,
        };

        // Fetch messages to be deleted before destroy so that we can save the files
        const messages = await Message.scope('withAttachment').findAll({
          where,
          transaction,
        });

        messages.forEach(({ attachment }) => {
          if (attachment) staleFiles.push(attachment.name);
        });

        await Message.destroy({ where, transaction });
      } else {
        // Do soft delete
        await Message.update(
          { isDeletedBySender: true },
          {
            where: {
              senderId: userId,
              receiverId: chatPartnerId,
            },
            transaction,
          },
        );
      }

      // #2 Process received messages.
      // Soft delete all received messages.
      // Receiver has no right to delete messages that he/she received
      await Message.update(
        { isDeletedByReceiver: true },
        {
          where: {
            receiverId: userId,
            senderId: chatPartnerId,
          },
          transaction,
        },
      );

      const [user1Id, user2Id] = sortChatUsersId(userId, chatPartnerId);

      const [chat, [lastMessageForPartner]] = await Promise.all([
        Chat.findOne({
          where: { user1Id, user2Id },
          transaction,
        }),

        Message.findAll({
          where: {
            [Op.or]: [
              {
                senderId: userId,
                receiverId: chatPartnerId,
                isDeletedByReceiver: false,
              },
              {
                senderId: chatPartnerId,
                receiverId: userId,
                isDeletedBySender: false,
              },
            ],
          },
          order: [['createdAt', 'DESC']],
          limit: 1,
          transaction,
        }),
      ]);

      if (chat) {
        if (lastMessageForPartner) {
          const lastMessageIdForUser1 =
            chat.user1Id === chatPartnerId ? lastMessageForPartner.id : null;

          const lastMessageIdForUser2 =
            chat.user2Id === chatPartnerId ? lastMessageForPartner.id : null;

          await chat.update(
            { lastMessageIdForUser1, lastMessageIdForUser2 },
            { transaction },
          );
        } else {
          await chat.destroy({ transaction });
        }
      }

      await transaction.commit();

      acknowledgement({
        status: 'ok',
        message: 'Chat deleted successfully.',
      });

      if (deleteForReceiver) {
        emitToUser(chatPartnerId, 'chat_deleted', {
          partnerId: userId,
          partnerMessagesDeleted: deleteForReceiver,
        });
      }
    } catch (error) {
      staleFiles = [];
      await transaction.rollback();
      throw error;
    }

    // delete stale files. no need to await
    deleteMessageFiles(staleFiles);

    // Hard delete all messages that are soft deleted by both users
    // including their files. there is no need to await the operation.
    cleanupChatMessages(userId, chatPartnerId);
  } catch (err) {
    acknowledgement({
      status: 'error',
      message: IS_PRODUCTION
        ? '500 Internal Server Error'
        : `INTERNAL SERVER ERROR: ${(err as Error).toString()}  ${(err as Error).stack}`,
    });
  }
};

export default deleteChat;
