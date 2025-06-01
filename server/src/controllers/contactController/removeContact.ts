import { Contact } from '../../models';
import { Request, Response, NextFunction } from 'express';
import { isPositiveInteger } from '../../utils';

const removeContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(
      typeof req.params.userId === 'string' ? req.params.userId.trim() : '',
      10
    );

    if (!isPositiveInteger(userId)) {
      return res.status(400).json({
        message: 'Invalid user id.'
      });
    }

    await Contact.destroy({
      where: {
        adderId: req.userId,
        addedId: userId
      }
    });

    res.status(200).json({
      success: true,
      message: 'Contact removed successfully.'
    });
  } catch (error) {
    next(error);
  }
};

export default removeContact;
