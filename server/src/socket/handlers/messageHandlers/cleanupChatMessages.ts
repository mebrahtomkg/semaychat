import sequelize from '@/config/db';
import { Message } from '@/models';
import { Op } from 'sequelize';
import deleteMessageFiles from './deleteMessageFiles';

const cleanupChatMessages = async (
  chatUser1Id: number,
  chatUser2Id: number,
) => {
  try {
    let staleFiles: string[] = [];
    const transaction = await sequelize.transaction();

    try {
      const where = {
        [Op.or]: [
          {
            senderId: chatUser1Id,
            receiverId: chatUser2Id,
          },
          {
            senderId: chatUser2Id,
            receiverId: chatUser1Id,
          },
        ],
        isDeletedBySender: true,
        isDeletedByReceiver: true,
      };

      // Fetch messages to be deleted before destroy so that we can save the files
      const messages = await Message.scope('withAttachment').findAll({
        where,
        transaction,
      });

      // Save files(names) for later cleanup
      messages.forEach(({ attachment }) => {
        if (attachment) staleFiles.push(attachment.name);
      });

      await Message.destroy({ where, transaction });
      await transaction.commit();
    } catch (err) {
      console.log(err);
      staleFiles = []; // Reset files list if the database operation failed
      await transaction.rollback();
    }

    // Delete the files after the database operation complated. this prevent blocking the db.
    await deleteMessageFiles(staleFiles);
  } catch (error) {
    console.error(error);
  }
};

export default cleanupChatMessages;
