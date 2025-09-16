import { Contact, User } from '@/models';
import { applyUserPrivacy } from '@/utils';
import { Request, Response, NextFunction } from 'express';

const listAllContacts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const contacts = await Contact.findAll({
      where: { adderId: req.userId },
      include: {
        model: User.scope([
          'withProfilePhoto',
          { method: ['withBlockedUsers', { blockedId: req.userId }] },
          { method: ['withContacts', { addedId: req.userId }] },
        ]),
        as: 'user',
        required: true,
      },
    });

    const transformedContacts = contacts.map((contact) => {
      const { user } = contact.toJSON();

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
      data: transformedContacts,
      message: 'Contacts fetched successfully.',
    });
  } catch (err) {
    next(err);
  }
};

export default listAllContacts;
