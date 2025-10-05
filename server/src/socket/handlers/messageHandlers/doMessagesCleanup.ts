import sequelize from '@/config/db';
import { MESSAGE_FILES_BUCKET } from '@/config/general';
import storage from '@/config/storage';
import { Message } from '@/models';
import { Op } from 'sequelize';

const doMessagesCleanup = async (user1Id: number, user2Id: number) => {
  try {
    let unusedFiles: string[] = [];
    const transaction = await sequelize.transaction();

    try {
      const where = {
        [Op.or]: [
          {
            senderId: user1Id,
            receiverId: user2Id,
          },
          {
            senderId: user2Id,
            receiverId: user1Id,
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
        if (attachment) unusedFiles.push(attachment.name);
      });

      await Message.destroy({ where, transaction });
      await transaction.commit();
    } catch (err) {
      console.log(err);
      unusedFiles = [];
      await transaction.rollback();
    }

    try {
      for (const file of unusedFiles) {
        await storage.deleteFile(MESSAGE_FILES_BUCKET, file);
      }
    } catch (err) {
      console.log(err);
    }
  } catch (error) {
    console.log(error);
  }
};

export default doMessagesCleanup;
