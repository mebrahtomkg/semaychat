import { User } from '../../models';
import { filterUserData, isPositiveInteger } from '../../utils';
import { Request, Response, NextFunction } from 'express';

const readMyAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!isPositiveInteger(req.userId)) {
      return res.status(401).json({
        message: 'User is not logged in.'
      });
    }

    const user = await User.scope('withProfilePhoto').findByPk(req.userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found.'
      });
    }

    res.status(200).json({
      success: true,
      data: filterUserData(user.toJSON()),
      message: 'User account fetched successfully'
    });
  } catch (err) {
    next(err);
  }
};

export default readMyAccount;
