import { Message } from '../../models';
import { Op } from 'sequelize';
import { Request, Response, NextFunction } from 'express';
import { filterMessageData, isPositiveInteger } from '../../utils';

const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const partnerId = parseInt(
      typeof req.params.partnerId === 'string'
        ? req.params.partnerId.trim()
        : '',
      10,
    );

    if (!isPositiveInteger(partnerId)) {
      return res.status(400).json({
        message: 'Invalid partner id.',
      });
    }

    const messages = await Message.scope(['withAttachment']).findAll({
      where: {
        [Op.or]: [
          {
            senderId: req.userId,
            receiverId: partnerId,
          },
          {
            senderId: partnerId,
            receiverId: req.userId,
          },
        ],
      },
    });

    const cleanMessages = messages.map((message) =>
      filterMessageData(message.toJSON()),
    );

    res.status(200).json({
      success: true,
      data: messages,
      message: 'Messages retrieved successfully',
    });
  } catch (err) {
    next(err);
  }
};

export default list;
