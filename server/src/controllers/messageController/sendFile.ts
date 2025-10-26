import { Request, Response, NextFunction } from 'express';
import { isPositiveInteger } from '@/utils';
import {
  IS_PRODUCTION,
  MAX_MESSAGE_FILE_SIZE,
  MESSAGE_FILES_BUCKET,
} from '@/config/general';
import storage from '@/config/storage';
import multer from 'multer';
import path from 'node:path';
import { emitToUser } from '@/socket/emitter';
import { sendMessage } from '@/services';
import { MessageSendError } from '@/services/sendMessage';

const attachmentUploader = multer({
  storage: storage.createStorageEngine(MESSAGE_FILES_BUCKET),
  limits: {
    files: 1,
    fileSize: MAX_MESSAGE_FILE_SIZE,
  },
}).single('attachment');

const attachmentUploaderAsync = (
  req: Request,
  res: Response,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    attachmentUploader(req, res, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

const sendFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!IS_PRODUCTION) {
      // delay for local dev testing
      await new Promise((resolve) => {
        setTimeout(() => resolve(null), 1_000);
      });
    }

    if (!req.userId) {
      res.status(401).json({ message: 'Not Authenticated!' });
      return;
    }

    await attachmentUploaderAsync(req, res);

    const receiverId = Number.parseInt(
      typeof req.body?.receiverId === 'string'
        ? req.body.receiverId.trim()
        : '',
      10,
    );

    if (!isPositiveInteger(receiverId)) {
      res.status(400).json({
        message: 'Invalid receiver id.',
      });
      return;
    }

    if (req.userId === receiverId) {
      res.status(400).json({
        message: 'You cannot send message to yourself.',
      });
      return;
    }

    const width =
      typeof req.body?.width === 'string' ? req.body.width.trim() : null;

    const height =
      typeof req.body?.height === 'string' ? req.body.height.trim() : null;

    const caption =
      typeof req.body?.caption === 'string' ? req.body.caption.trim() : null;

    const file = req.file;

    if (!file) {
      res.status(400).json({
        message: 'No file attached.',
      });
      return;
    }

    const { path: filePath, size, originalname } = file;

    try {
      const { message, sender } = await sendMessage({
        senderId: req.userId as number,
        receiverId,
        attachment: {
          name: path.basename(filePath),
          originalname,
          size,
          width,
          height,
          caption,
        },
      });

      res.status(200).json({
        success: true,
        message: 'Message sent successfully!',
        data: message,
      });

      emitToUser(receiverId, 'message_received', { message, sender });
    } catch (err) {
      await storage.deleteFile(MESSAGE_FILES_BUCKET, filePath);
      if (err instanceof MessageSendError) {
        res.status(err.status).json({
          message: err.message,
        });
      } else {
        throw err;
      }
    }
  } catch (error) {
    next(error);
  }
};

export default sendFile;
