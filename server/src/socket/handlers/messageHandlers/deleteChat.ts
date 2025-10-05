import { Op } from 'sequelize';
import sequelize from '@/config/db';
import { Chat, Message } from '@/models';
import { Acknowledgement, AuthenticatedSocket } from '@/types';
import { isPositiveInteger } from '@/utils';
import { emitToUser } from '@/socket/emitter';
import { IS_PRODUCTION } from '@/config/general';

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

    const { chatPartnerId, deleteForReceiver } = payload;

    if (!isPositiveInteger(chatPartnerId)) {
      return acknowledgement({
        status: 'error',
        message: 'Invalid chat partner id.',
      });
    }

    const userId = socket.userId;

    // delete all messages that are with this partner
    // soft delete received messages files not touched
    // hard delete sent messages if delete for receiver is checked,files must deleted
    // dont delete chat if messages exist in that chat

    /**
     * If `deleteForReciver` !== false : do soft delete on all messages within this chat for only
     * this user. attachments shoulnot touched. also update last message for this user on this
     * chat. partner will not see any effect. but if they were soft deleted by receiver should be
     * deleted permanently.
     *
     *
     * If `deleteForReciver` !== true : messages sent by partner become soft deleted by this user.
     * the partner keep seeing them. messages sent by this user will be deleted from database with
     * their attachments permanently. chat is updated to reflect this deletion for both users.
     *
     *
     * Received messages = soft del always -- update query
     * Sent messages = hard del if deleteForReciver = true otherwise soft del -- update|del query
     * Cleanup: hard del any message on this chat that is soft deleted by both users -- del query
     * Attachments should also deleted on msg hard del
     *
     * hard del for soft deleted by receiver and this
     *
     * deleteForReciver=true
     *   Received messages:
     *       if soft deleted by sender: hard del --destroy query
     *       otherwise soft del -- update query
     *   Sent messages:
     *       always hard del -- destroy query
     *
     *
     * deleteForReciver=false
     *   Received messages:
     *       if soft deleted by sender: hard del --destroy query
     *       otherwise soft del -- update query
     *   Sent messages:
     *       if soft deleted by receiver: hard del --destroy query
     *       otherwise soft del -- update query
     *
     * if (deleteForrecever)
     *
     *
     * finally update chat by looking up messages table. separate query sure!!
     */

    const transaction = await sequelize.transaction();

    try {
      // Process sent messages.
      // The deleteForReceiver option has effect only on sent messages
      if (deleteForReceiver) {
        // Do hard delete for all messages sent to the partner.
        await Message.destroy({
          where: {
            senderId: userId,
            receiverId: chatPartnerId,
          },
          transaction,
        });
      } else {
        // Do soft delete for all messages sent to the partner.
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

      // Now process received messages.
      // Soft delete all received messages.
      // Receiver has no right to delete messages that he/she received
      await Message.update(
        { isDeletedBySender: true },
        {
          where: {
            senderId: chatPartnerId,
            receiverId: userId,
          },
          transaction,
        },
      );

      // Cleanup: Now hard delete all messages that are soft deleted by both users
      await Message.destroy({
        where: {
          [Op.or]: [
            {
              senderId: userId,
              receiverId: chatPartnerId,
            },
            {
              senderId: chatPartnerId,
              receiverId: userId,
            },
          ],
          isDeletedBySender: true,
          isDeletedByReceiver: true,
        },
        transaction,
      });

      const [lastMessageForPartner] = await Message.findAll({
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
      });

      const chat = await Chat.findOne({
        where: {
          [Op.or]: [
            {
              user1Id: userId,
              user2Id: chatPartnerId,
            },
            {
              user1Id: chatPartnerId,
              user2Id: userId,
            },
          ],
        },
        transaction,
      });

      if (chat) {
        if (lastMessageForPartner) {
          if (chat.user1Id === chatPartnerId) {
            await chat.update(
              {
                lastMessageIdForUser1: lastMessageForPartner.id,
                lastMessageIdForUser2: null,
              },
              { transaction },
            );
          } else {
            await chat.update(
              {
                lastMessageIdForUser1: null,
                lastMessageIdForUser2: lastMessageForPartner.id,
              },
              { transaction },
            );
          }
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
        });
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
        : `INTERNAL SERVER ERROR: ${(err as Error).toString()}  ${(err as Error).stack}`,
    });
  }
};

export default deleteChat;
