import { formidable } from 'formidable';
import Message from '../../models/Message';
import { TEMP_FILES_DIR, MESSAGE_FILES_DIR } from '../../constants';
import path from 'node:path';
import fs from 'node:fs/promises';
import { getFileExtension } from '../../utils';
import { Request, Response, NextFunction } from 'express';

const upload = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'Not Authenticated!' });
    }

    const form = formidable({
      uploadDir: TEMP_FILES_DIR,
      keepExtensions: true
    });

    const [fields, files] = await form.parse(req);

    const receiverId = parseInt(
      typeof fields.receiverId[0] === 'string'
        ? fields.receiverId[0].trim()
        : '',
      10
    );

    if (Number.isNaN(receiverId) || !receiverId) {
      res.status(400).json({
        message: 'Invalid receiver id.'
      });
      //Also check if receiver exists in db.
      //Also check if this sender is blocked by the reciever.
      return;
    }

    const file = files.messageFile[0];

    const { filepath, size: fileSize, originalFilename: fileName } = file;

    const fileExtension = getFileExtension(fileName);

    const senderId = req.userId;

    const message = await Message.create({
      senderId,
      receiverId
      // isFile: true,
      // fileName,
      // fileExtension,
      // fileSize
    });

    await fs.rename(filepath, path.resolve(MESSAGE_FILES_DIR, `${message.id}`));

    res.status(200).json({
      success: true,
      message: 'Message file saved successfully.',
      data: message
    });
  } catch (error) {
    next(error);
  }
};

export default upload;
