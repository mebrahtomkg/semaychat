import { BlockedUser, User } from '../../models';
import { isPositiveInteger } from '../../utils';
import { Request, Response, NextFunction } from 'express';

const blockUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'Not Authenticated!' });
    }

    const { userId } = req.body;

    if (!isPositiveInteger(userId)) {
      return res.status(400).json({
        message: 'Invalid user id.'
      });
    }

    if (userId === req.userId) {
      return res.status(400).json({
        message: 'Cannot block yourself!'
      });
    }

    if (!(await User.findByPk(userId))) {
      return res.status(409).json({
        message: 'Cannot block a user who does not exist.'
      });
    }

    const existingBlockedUser = await BlockedUser.findOne({
      where: {
        blockerId: req.userId,
        blockedId: userId
      }
    });

    if (existingBlockedUser) {
      return res.status(409).json({
        message: 'The user was already blocked.'
      });
    }

    const blockedUser = await BlockedUser.create({
      blockerId: req.userId,
      blockedId: userId
    });

    res.status(200).json({
      success: true,
      data: blockedUser.toJSON(),
      message: 'User blocked successfully.'
    });
  } catch (error) {
    next(error);
  }
};

export default blockUser;
