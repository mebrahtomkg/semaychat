import { Op } from 'sequelize';
import { Message, Chat } from '../../models';
import sequelize from '../../config/db';
import { Request, Response, NextFunction } from 'express';

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId;

    const id = parseInt(
      typeof req.params.id === 'string' ? req.params.id.trim() : '',
      10
    );

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: 'Invalid message id.'
      });
    }

    const transaction = await sequelize.transaction();

    try {
      const message = await Message.findByPk(id, {
        transaction,
        lock: transaction.LOCK.UPDATE
      });

      if (!message) {
        await transaction.rollback();
        return res.status(404).json({
          message: 'Message not found.'
        });
      }

      const isSentMessage = message.senderId === userId;

      const isDeletedSoftly = isSentMessage
        ? message.isDeletedBySender
        : message.isDeletedByReceiver;

      if (isDeletedSoftly) {
        await transaction.rollback();
        return res.status(409).json({
          message: 'Message already deleted.'
        });
      }

      const canDelete =
        message.senderId === userId || message.receiverId === userId;

      if (!canDelete) {
        await transaction.rollback();
        return res.status(403).json({
          message: 'You have no permission to delete this message.'
        });
      }

      const deleteForReceiver =
        typeof req.query.deleteForReceiver === 'string'
          ? req.query.deleteForReceiver.trim() === 'true'
          : false;

      // Find the target chat before its message ids become null
      const chat = await Chat.findOne({
        where: {
          [Op.or]: [
            { lastMessageIdForUser1: id },
            { lastMessageIdForUser2: id }
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
        return res.status(200).json({
          success: true,
          message: 'Message deleted successfully.'
        });
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

      res.status(200).json({
        success: true,
        message: 'Message deleted successfully.'
      });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (err) {
    next(err);
  }
};

export default remove;
