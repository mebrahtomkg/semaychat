import { Request, Response, NextFunction } from 'express';
import commitSendingMessage from './commitSendingMessage';
import { isPositiveInteger } from '@/utils';
import { Attachment } from '@/models';
import sequelize from '@/config/db';
import {
  IS_PRODUCTION,
  MAX_MESSAGE_FILE_SIZE,
  MESSAGE_FILES_BUCKET,
} from '@/config/general';
import storage from '@/config/storage';
import multer from 'multer';
import path from 'node:path';

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
        setTimeout(() => resolve(null), 3_000);
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

    const transaction = await sequelize.transaction();

    try {
      const attachment = await Attachment.create(
        {
          name: path.basename(filePath),
          originalname,
          size,
          width,
          height,
          caption,
        },
        { transaction },
      );

      const { status, message, success, data } = await commitSendingMessage({
        transaction,
        senderId: req.userId as number,
        receiverId,
        attachmentId: attachment.id,
      });

      await transaction.commit();

      res.status(status).json({ message, success, data });
    } catch (err) {
      await transaction.rollback();
      await storage.deleteFile(MESSAGE_FILES_BUCKET, filePath);
      throw err;
    }
  } catch (error) {
    next(error);
  }
};

export default sendFile;
