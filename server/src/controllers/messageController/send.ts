import sequelize from '../../config/db';
import { VISIBILITY_OPTIONS } from '../../constants';
import { Message, Chat, User } from '../../models';
import { isPositiveInteger } from '../../utils';
import { Request, Response, NextFunction } from 'express';

const send = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'Not Authenticated!' });
    }

    const { receiverId } = req.body;

    if (!isPositiveInteger(receiverId)) {
      return res.status(400).json({
        message: 'Invalid receiver id.'
      });
    }

    if (req.userId == receiverId) {
      return res.status(400).json({
        message: 'You cannot send message to yourself.'
      });
    }

    const content =
      typeof req.body.content === 'string' ? req.body.content.trim() : null;

    if (!content) {
      return res.status(400).json({
        message: 'Invalid message content.'
      });
      // Check content for xss security, filter it.
    }

    const senderId = req.userId;

    const [[sender], [receiver]] = await Promise.all([
      User.scope({
        method: ['withBlockedUsers', { blockedId: receiverId }]
      }).findAll({
        where: { id: senderId },
        limit: 1
      }),

      User.scope([
        {
          method: ['withBlockedUsers', { blockedId: senderId }]
        },
        {
          method: ['withContacts', { addedId: senderId }]
        }
      ]).findAll({
        where: { id: receiverId },
        limit: 1
      })
    ]);

    if (!receiver) {
      return res.status(409).json({
        message: 'Cannot send message to non existed user.'
      });
    }

    const receiverIsBlockedBySender = sender.blockedUsers
      ? sender.blockedUsers.length > 0
      : false;

    const senderIsBlockedByReceiver = receiver.blockedUsers
      ? receiver.blockedUsers.length > 0
      : false;

    const senderIsContactOfReceiver = receiver.contacts
      ? receiver.contacts.length > 0
      : false;

    if (receiverIsBlockedBySender) {
      return res.status(403).json({
        message: 'You cannot send message to a user you blocked.'
      });
    }

    // Receiver could disabled accepting messages via privacy settings.
    const receiverCanAcceptThisMessage =
      receiver.messageSender === VISIBILITY_OPTIONS.everybody ||
      (receiver.messageSender === VISIBILITY_OPTIONS.contacts &&
        senderIsContactOfReceiver);

    if (!receiverCanAcceptThisMessage) {
      return res.status(403).json({
        message: 'Receiver is not accepting messages.'
      });
    }

    const transaction = await sequelize.transaction();

    try {
      const [[chat], message] = await Promise.all([
        Chat.findOrCreate({
          where: {
            // Ensure consistent order to prevent duplicate chat rows
            user1Id: Math.min(senderId, receiverId),
            user2Id: Math.max(senderId, receiverId)
          },
          transaction,
          lock: transaction.LOCK.UPDATE
        }),

        Message.create(
          {
            senderId,
            receiverId,
            content,
            // If the sender is blocked by the receiver, soft delete the message for
            // the receiver. so that the message will not be visible by the receiver.
            // only the sender can see the message.
            isDeletedByReceiver: senderIsBlockedByReceiver
          },
          { transaction }
        )
      ]);

      let valuesToUpdate: {
        lastMessageIdForUser1?: number;
        lastMessageIdForUser2?: number;
      } = {
        lastMessageIdForUser1: message.id,
        lastMessageIdForUser2: message.id
      };

      // If the sender is blocked by receiver, only update sender's last message's id.
      if (senderIsBlockedByReceiver) {
        valuesToUpdate =
          senderId === chat.user1Id
            ? { lastMessageIdForUser1: message.id }
            : { lastMessageIdForUser2: message.id };
      }

      await chat.update(valuesToUpdate, { transaction });

      await transaction.commit();

      res.status(200).json({
        success: true,
        message: 'Message sent successfully.',
        data: message
      });
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  } catch (error) {
    next(error);
  }
};

export default send;
