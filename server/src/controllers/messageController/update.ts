import { isPositiveInteger } from '../../utils';
import Message from '../../models/Message';
import { Request, Response, NextFunction } from 'express';

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body;

    if (!isPositiveInteger(id)) {
      return res.status(400).json({
        message: 'Invalid message id.'
      });
    }

    const message = await Message.findByPk(id);

    if (!message) {
      return res.status(409).json({
        message: 'Message does not exist.'
      });
    }

    const userId = req.userId;

    if (message.senderId !== userId) {
      return res.status(403).json({
        message: 'You cannot edit this message.'
      });
    }

    if (message.attachment) {
      return res.status(409).json({
        message: 'File message cannot be edited.'
      });
    }

    const content =
      typeof req.body.content === 'string' ? req.body.content.trim() : null;

    if (!content) {
      return res.status(400).json({
        message: 'Invalid message content.'
      });
      // Also Check content for xss security, filter it.
    }

    await Message.update({ content, editedAt: Date.now() }, { where: { id } });

    const updatedMessage = await Message.findByPk(id);

    res.status(200).json({
      success: true,
      data: updatedMessage?.toJSON(),
      message: 'Message updated successfully.'
    });
  } catch (err) {
    next(err);
  }
};

export default update;
