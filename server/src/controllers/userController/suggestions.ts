import { BlockedUser, Chat, Contact, User } from '../../models';
import { Request, Response, NextFunction } from 'express';
import { applyUserPrivacy } from '../../utils';
import { Op } from 'sequelize';

const suggestions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'Not Authenticated!' });
    }

    const requesterId = req.userId;

    // Fetch chats, blockedUsers, contacts of the user
    const [chats, blockedUsers, contacts] = await Promise.all([
      Chat.findAll({
        where: {
          [Op.or]: [{ user1Id: requesterId }, { user2Id: requesterId }],
        },
        attributes: ['user1Id', 'user2Id'],
      }),

      BlockedUser.findAll({
        where: { blockerId: requesterId },
        attributes: ['blockedId'],
      }),

      Contact.findAll({
        where: { adderId: requesterId },
        attributes: ['addedId'],
      }),
    ]);

    const knownUsersId = [requesterId];

    chats.forEach((chat) => {
      if (chat.user1Id === requesterId) {
        knownUsersId.push(chat.user2Id);
      } else {
        knownUsersId.push(chat.user1Id);
      }
    });

    contacts.forEach((contact) => knownUsersId.push(contact.addedId));

    blockedUsers.forEach((blockedUser) =>
      knownUsersId.push(blockedUser.blockedId),
    );

    if (knownUsersId.length > 50) {
      return res.status(409).json({
        message: 'Not eligible for suggestion. User has enough known people.',
      });
    }

    // Fetch users that are not in chats, blockedUsers, contacts of the user
    const users = await User.scope(['withProfilePhoto']).findAll({
      where: {
        id: { [Op.notIn]: knownUsersId },
      },
    });

    const transformedUsers = users.map((user) =>
      applyUserPrivacy(user.toJSON(), {
        requesterIsBlocked: false,
        requesterIsContact: false,
      }),
    );

    res.status(200).json({
      success: true,
      data: transformedUsers,
      message: 'Users fetched successfully.',
    });
  } catch (err) {
    next(err);
  }
};

export default suggestions;
