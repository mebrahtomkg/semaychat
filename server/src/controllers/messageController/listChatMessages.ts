import { Op } from 'sequelize';
import { Request, Response, NextFunction } from 'express';
import { filterMessageData, isPositiveInteger } from '@/utils';
import { Message } from '@/models';

const listChatMessages = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const chatPartnerId = parseInt(
      typeof req.params.chatPartnerId === 'string'
        ? req.params.chatPartnerId.trim()
        : '',
      10,
    );

    if (!isPositiveInteger(chatPartnerId)) {
      res.status(400).json({
        message: 'Invalid chat partner id.',
      });
      return;
    }

    const userId = req.userId as number;

    const messages = await Message.scope(['withAttachment']).findAll({
      where: {
        [Op.or]: [
          {
            senderId: userId,
            receiverId: chatPartnerId,
            isDeletedBySender: false,
          },
          {
            senderId: chatPartnerId,
            receiverId: userId,
            isDeletedByReceiver: false,
          },
        ],
      },
    });

    const data = messages.map((message) => filterMessageData(message));

    res.status(200).json({
      success: true,
      data,
      message: 'Messages retrieved successfully',
    });
  } catch (err) {
    next(err);
  }
};

export default listChatMessages;
