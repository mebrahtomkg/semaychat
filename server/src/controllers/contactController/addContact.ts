import { Contact, User } from '@/models';
import { isPositiveInteger } from '@/utils';
import { Request, Response, NextFunction } from 'express';

const addContact = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'Not Authenticated!' });
    }

    const { userId } = req.body;

    if (!isPositiveInteger(userId)) {
      return res.status(400).json({
        message: 'Invalid user id.',
      });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found.',
      });
    }

    const existingContact = await Contact.findOne({
      where: {
        adderId: req.userId,
        addedId: userId,
      },
    });

    if (existingContact) {
      return res.status(409).json({
        message: 'This user is already your contact.',
      });
    }

    await Contact.create({
      adderId: req.userId,
      addedId: userId,
    });

    res.status(200).json({
      success: true,
      data: user.toJSON(),
      message: 'Contact added successfully.',
    });
  } catch (error) {
    next(error);
  }
};

export default addContact;
