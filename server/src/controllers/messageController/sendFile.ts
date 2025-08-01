import { Request, Response, NextFunction } from 'express';
import commitSendingMessage from './commitSendingMessage';
import { MESSAGE_FILES_BUCKET } from '@/constants';
import { getFileExtension, isPositiveInteger } from '@/utils';
import { Attachment } from '@/models';
import sequelize from '@/config/db';
import storageService from '@/services/StorageService';

const sendFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: 'Not Authenticated!' });
      return;
    }

    const receiverId = Number.parseInt(
      typeof req.body?.receiverId === 'string'
        ? req.body.receiverId.trim()
        : '',
      10
    );

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

    const caption =
      typeof req.body?.caption === 'string' ? req.body.caption.trim() : null;

    const file = req.file;

    if (!file) {
      res.status(400).json({
        message: 'No file attached.'
      });
      return;
    }

    const { path: filepath, size, originalname: name } = file;

    const extension = getFileExtension(name) || '';

    const transaction = await sequelize.transaction();

    try {
      const attachment = await Attachment.create(
        { name, extension, size, caption },
        { transaction }
      );

      const { status, message, success, data } = await commitSendingMessage({
        transaction,
        senderId: req.userId,
        receiverId,
        attachmentId: attachment.id
      });

      await storageService.saveFile(
        MESSAGE_FILES_BUCKET,
        filepath,
        attachment.id
      );

      await transaction.commit();

      res.status(status).json({ message, success, data });
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  } catch (error) {
    next(error);
  }
};

export default sendFile;
