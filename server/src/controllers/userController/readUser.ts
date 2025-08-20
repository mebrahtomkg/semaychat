import { User } from '../../models';
import { Request, Response, NextFunction } from 'express';
import { applyUserPrivacy, isPositiveInteger } from '../../utils';

const readUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const requesterId = req.userId;

    const id = parseInt(
      typeof req.params.userId === 'string' ? req.params.userId : '',
      10,
    );

    if (!isPositiveInteger(id)) {
      return res.status(400).json({
        message: 'Invalid user id.',
      });
    }

    const user = await User.scope([
      'withProfilePhoto',
      { method: ['withBlockedUsers', { blockedId: requesterId }] },
      { method: ['withContacts', { addedId: requesterId }] },
    ]).findByPk(id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found.',
      });
    }

    const cleanUser = applyUserPrivacy(user.toJSON(), {
      requesterIsBlocked: user.blockedUsers
        ? user.blockedUsers.length > 0
        : false,
      requesterIsContact: user.contacts ? user.contacts.length > 0 : false,
    });

    res.status(200).json({
      success: true,
      data: cleanUser,
      message: 'User fetched successfully.',
    });
  } catch (err) {
    next(err);
  }
};

export default readUser;
