import { BlockedUser, User } from '../../models';
import { applyUserPrivacy } from '../../utils';
import { Request, Response, NextFunction } from 'express';

const listAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blockedUsers = await BlockedUser.findAll({
      where: { blockerId: req.userId },
      include: {
        model: User.scope([
          'withProfilePhoto',
          { method: ['withContacts', { addedId: req.userId }] },
          { method: ['withBlockedUsers', { blockedId: req.userId }] },
        ]),
        as: 'user',
      },
    });

    const transformedBlockedUsers = blockedUsers.map((blockedUser) => {
      const { user } = blockedUser.toJSON();

      if (!user) throw new Error('Invalid user!');

      return applyUserPrivacy(user, {
        requesterIsBlocked: user.blockedUsers
          ? user.blockedUsers.length > 0
          : false,
        requesterIsContact: user.contacts ? user.contacts.length > 0 : false,
      });
    });

    res.status(200).json({
      success: true,
      data: transformedBlockedUsers,
      message: 'blocked users fetched successfully.',
    });
  } catch (err) {
    next(err);
  }
};

export default listAll;
