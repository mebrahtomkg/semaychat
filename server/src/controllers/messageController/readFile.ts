import { Request, Response, NextFunction } from 'express';
import { isPositiveInteger } from '@/utils';
import { Message } from '@/models';
import mime from 'mime-types';
import { MESSAGE_FILES_BUCKET } from '@/config/general';
import storage from '@/config/storage';

const readFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const messageId = Number.parseInt(
      typeof req.params.messageId === 'string'
        ? req.params.messageId.trim()
        : '',
      10,
    );

    if (!isPositiveInteger(messageId)) {
      res.status(400).json({
        message: 'Invalid message id.',
      });
      return;
    }

    const message = await Message.scope('withAttachment').findByPk(messageId);

    if (!message) {
      res.status(404).json({
        message: 'Message not found.',
      });
      return;
    }

    const userId = req.userId;

    const canAccess =
      message.senderId === userId || message.receiverId === userId;

    if (!canAccess) {
      res.status(403).json({
        message: 'You have no permision to access this file',
      });
      return;
    }

    if (!message.attachment) {
      res.status(409).json({
        message: 'This is not a file message.',
      });
      return;
    }

    const result = await storage.getFile(
      MESSAGE_FILES_BUCKET,
      message.attachment.id,
    );

    if (typeof result === 'string') {
      res.status(200).sendFile(result);
    } else {
      res.setHeader(
        'Content-Type',
        mime.lookup(message.attachment.name) || 'application/octet-stream',
      );

      res.setHeader(
        'Content-Disposition',
        `inline; filename="${message.attachment.name}"`,
      );

      res.setHeader('Content-Length', result.length);

      res.status(200).send(result);
    }
  } catch (err) {
    next(err);
  }
};

export default readFile;
