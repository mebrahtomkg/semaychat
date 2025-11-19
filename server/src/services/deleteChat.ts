import { Op } from 'sequelize';
import sequelize from '@/config/db';
import { Chat, Message } from '@/models';
import { sortChatUsersId } from '@/utils';
import { deleteMessageFiles } from '@/services';

export class ChatDeleteError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ChatDeleteError';
  }
}

interface ChatDeleteProps {
  userId: number;
  partnerId: number;
  deleteForReceiver?: boolean;
}

const deleteChat = async ({
  userId,
  partnerId,
  deleteForReceiver,
}: ChatDeleteProps) => {
  const transaction = await sequelize.transaction();
  const staleFiles: string[] = [];

  try {
    const [user1Id, user2Id] = sortChatUsersId(userId, partnerId);

    const chat = await Chat.findOne({
      where: { user1Id, user2Id },
      transaction,
      lock: transaction.LOCK.UPDATE,
    });

    if (!chat) {
      throw new ChatDeleteError('Chat not found!');
    }

    const chatId = chat.id;

    await Promise.all([
      // #1 Process sent messages.
      // Effect of deleteForReceiver option is only on sent messages!
      // To mark a message for destroy, soft delete by both users tech is used. this enables
      // us to collect stale files later properly.
      Message.update(
        deleteForReceiver
          ? { isDeletedBySender: true, isDeletedByReceiver: true }
          : { isDeletedBySender: true },
        {
          where: {
            chatId,
            senderId: userId,
          },
          transaction,
        },
      ),

      // #2 Process received messages.
      // Soft delete all received messages.
      // Receiver has no right to delete messages that he/she received
      Message.update(
        { isDeletedByReceiver: true },
        {
          where: {
            chatId,
            receiverId: userId,
          },
          transaction,
        },
      ),
    ]);

    // Fetch messages(that have attachment) to be deleted before destroy so
    // that we can collect the stale files
    const messages = await Message.scope('withAttachment').findAll({
      where: {
        chatId,
        isDeletedBySender: true,
        isDeletedByReceiver: true,
        attachmentId: { [Op.not]: null },
      },
      transaction,
    });

    // Collect stale files
    messages.forEach(({ attachment }) => {
      if (attachment) staleFiles.push(attachment.name);
    });

    // Hard delete all messages that are soft deleted by both users
    await Message.destroy({
      where: {
        chatId,
        isDeletedBySender: true,
        isDeletedByReceiver: true,
      },
      transaction,
    });

    // Find last message for partner. the use who is deleting this chat does not need
    // chat last message since he/she deleted the chat.
    const lastMessageForPartner = await Message.findOne({
      where: {
        chatId,
        [Op.or]: [
          {
            senderId: partnerId,
            isDeletedBySender: false,
          },
          {
            receiverId: partnerId,
            isDeletedByReceiver: false,
          },
        ],
      },
      order: [['createdAt', 'DESC']],
      limit: 1,
      transaction,
    });

    // If proper last message for partner is found, update the chat to reflect this. otherwise
    // destroy the chat as it does not have valid use for both users.
    if (lastMessageForPartner) {
      type ChatUser = 'user1' | 'user2';

      const partnerChatUser: ChatUser =
        chat.user1Id === partnerId ? 'user1' : 'user2';

      const lastMessageIdForUser1 =
        partnerChatUser === 'user1' ? lastMessageForPartner.id : null;

      const lastMessageIdForUser2 =
        partnerChatUser === 'user2' ? lastMessageForPartner.id : null;

      await chat.update(
        {
          lastMessageIdForUser1,
          lastMessageIdForUser2,
        },
        { transaction },
      );
    } else {
      await chat.destroy({ transaction });
    }

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }

  // delete stale files. no need to await
  // observe that, this will not run if the database operation was not successfull
  // as the error is thrown inside the catch block above.
  deleteMessageFiles(staleFiles);
};

export default deleteChat;
