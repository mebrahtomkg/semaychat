import { MESSAGE_FILES_DIR } from '../../constants';
import Message from '../../models/Message';
import path from 'node:path';
import { Request, Response, NextFunction } from 'express';

///!NEED fix
const download = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(
      typeof req.params.id === 'string' ? req.params.id.trim() : '',
      10
    );

    if (!id) {
      res.status(400).json({
        message: 'Invalid message id.'
      });
      return;
    }

    const message = await Message.findByPk(id);

    if (!message) {
      res.status(404).json({
        message: 'Message not found.'
      });
      return;
    }

    const userId = req.userId;

    const canDownload =
      message.senderId === userId || message.receiverId === userId;

    if (!canDownload) {
      res.status(403).json({
        message: 'You have no permision to download this file'
      });
      return;
    }

    if (!message.attachment) {
      res.status(409).json({
        message: 'This is not a file message.'
      });
      return;
    }

    const filePath = path.resolve(MESSAGE_FILES_DIR, `${message.id}`);

    res.status(200).download(filePath);
  } catch (err) {
    next(err);
  }
};

export default download;
