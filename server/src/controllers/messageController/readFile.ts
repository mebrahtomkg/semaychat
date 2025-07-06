import path from 'node:path';
import { Request, Response, NextFunction } from 'express';
import { isPositiveInteger } from '@/utils';
import { Message } from '@/models';
import { MESSAGE_FILES_DIR } from '@/constants';
import { downloadFile } from '@/services/supabase';
import mime from 'mime-types';

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

    const message = await Message.scope('withAttachment').findByPk(messageId);

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

    if (!message.attachment) {
      res.status(409).json({
        message: 'This is not a file message.'
      });
      return;
    }

    // const filePath = path.resolve(
    //   MESSAGE_FILES_DIR,
    //   `${message.attachment.id}`
    // );
    // res.status(200).sendFile(filePath);

    const blob = await downloadFile('message-files', message.attachment.id);

    const arrayBuffer = await blob.arrayBuffer(); // Get ArrayBuffer from Blob
    const fileBuffer = Buffer.from(arrayBuffer); // Convert ArrayBuffer to Node.js Buffer

    res.setHeader(
      'Content-Type',
      mime.lookup(message.attachment.name) || 'application/octet-stream'
    );

    res.setHeader(
      'Content-Disposition',
      `inline; filename="${message.attachment.name}"`
    );

    res.setHeader('Content-Length', fileBuffer.length);

    res.status(200).send(fileBuffer);
  } catch (err) {
    next(err);
  }
};

export default readFile;
