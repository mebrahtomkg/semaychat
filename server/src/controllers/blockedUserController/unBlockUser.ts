import { BlockedUser } from '../../models';
import { isPositiveInteger } from '../../utils';
import { Request, Response, NextFunction } from 'express';

const unBlockUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = parseInt(
      typeof req.params.userId === 'string' ? req.params.userId.trim() : '',
      10,
    );

    if (!isPositiveInteger(userId)) {
      return res.status(400).json({
        message: 'Invalid user id.',
      });
    }

    await BlockedUser.destroy({
      where: {
        blockerId: req.userId,
        blockedId: userId,
      },
    });

    res.status(200).json({
      success: true,
      message: 'User unblocked successfully.',
    });
  } catch (error) {
    next(error);
  }
};

export default unBlockUser;
