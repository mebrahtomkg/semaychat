import path from 'node:path';
import { Request, Response, NextFunction } from 'express';
import { isPositiveInteger } from '@/utils';
import { Message } from '@/models';
import { MESSAGE_FILES_DIR } from '@/constants';

const readFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const messageId = Number.parseInt(
      typeof req.params.messageId === 'string'
        ? req.params.messageId.trim()
        : '',
      10
    );

    if (!isPositiveInteger(messageId)) {
      res.status(400).json({
        message: 'Invalid message id.'
      });
      return;
    }

    const message = await Message.findByPk(messageId);

    if (!message) {
      res.status(404).json({
        message: 'Message not found.'
      });
      return;
    }

    const userId = req.userId;

    const canAccess =
      message.senderId === userId || message.receiverId === userId;

    if (!canAccess) {
      res.status(403).json({
        message: 'You have no permision to access this file'
      });
      return;
    }

    if (!message.attachmentId) {
      res.status(409).json({
        message: 'This is not a file message.'
      });
      return;
    }

    const filePath = path.resolve(MESSAGE_FILES_DIR, `${message.attachmentId}`);

    res.status(200).sendFile(filePath);
  } catch (err) {
    next(err);
  }
};

export default readFile;
