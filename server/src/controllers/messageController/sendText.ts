import { Request, Response, NextFunction } from 'express';
import commitSendingMessage from './commitSendingMessage';
import { isPositiveInteger } from '@/utils';
import sequelize from '@/config/db';
import { sendTextMessageToClient } from '@/socket';
import { Message } from '@/models';

const sendText = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: 'Not Authenticated!' });
      return;
    }

    const receiverId = req.body?.receiverId;

    if (!isPositiveInteger(receiverId)) {
      res.status(400).json({
        message: 'Invalid receiver id.'
      });
      return;
    }

    if (req.userId === receiverId) {
      res.status(400).json({
        message: 'You cannot send message to yourself.'
      });
      return;
    }

    const content =
      typeof req.body.content === 'string' ? req.body.content.trim() : null;

    if (!content) {
      res.status(400).json({
        message: 'Invalid message content.'
      });
      return;
      //TODO: Check content for xss security, filter it.
    }

    const transaction = await sequelize.transaction();

    try {
      const { status, message, success, data } = await commitSendingMessage({
        transaction,
        senderId: req.userId,
        receiverId,
        content
      });

      transaction.commit();

      res.status(status).json({ message, success, data });

      if (status === 200) {
        sendTextMessageToClient(data as Message);
      }
    } catch (err) {
      transaction.rollback();
      throw err;
    }
  } catch (error) {
    next(error);
  }
};

export default sendText;
