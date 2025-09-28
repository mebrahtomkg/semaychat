import { Request, Response, NextFunction } from 'express';
import { Attachment, Message } from '@/models';
import { IS_PRODUCTION, MESSAGE_FILES_BUCKET } from '@/config/general';
import storage from '@/config/storage';

const readFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!IS_PRODUCTION) {
      // delay for local dev testing
      await new Promise((resolve) => {
        setTimeout(() => resolve(null), 3_000);
      });
    }

    const fileName =
      typeof req.params.fileName === 'string'
        ? req.params.fileName.trim()
        : null;

    if (!fileName) {
      res.status(400).json({
        message: 'Invalid file name.',
      });
      return;
    }

    const attachment = await Attachment.findOne({
      where: { name: fileName },
    });

    if (!attachment) {
      res.status(404).json({
        message: 'Attachment not found.',
      });
      return;
    }

    const message = await Message.findOne({
      where: { attachmentId: attachment.id },
    });

    if (!message) {
      res.status(404).json({
        message: 'Message that correspond to this attachment not found.',
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

    await storage.serveFile(MESSAGE_FILES_BUCKET, attachment.name, res, {
      'Content-Disposition': `inline; filename="${attachment.originalname}"`,
    });
  } catch (err) {
    next(err);
  }
};

export default readFile;
