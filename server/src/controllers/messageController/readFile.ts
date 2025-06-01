import { MESSAGE_FILES_DIR } from '../../constants';
import Message from '../../models/Message';
import path from 'node:path';
import { Request, Response, NextFunction } from 'express';

const readFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(
      typeof req.params.id === 'string' ? req.params.id.trim() : '',
      10
    );

    if (!id) {
      return res.status(400).json({
        message: 'Invalid message id.'
      });
    }

    const message = await Message.findByPk(id);

    if (!message) {
      return res.status(404).json({
        message: 'Message not found.'
      });
    }

    const userId = req.userId;

    const canAccess =
      message.senderId === userId || message.receiverId === userId;

    if (!canAccess) {
      return res.status(403).json({
        message: 'You have no permision to access this file'
      });
    }

    if (!message.attachment) {
      return res.status(409).json({
        message: 'This is not a file message.'
      });
    }

    const filePath = path.resolve(MESSAGE_FILES_DIR, `${message.id}`);

    res.status(200).sendFile(filePath);
  } catch (err) {
    next(err);
  }
};

export default readFile;
