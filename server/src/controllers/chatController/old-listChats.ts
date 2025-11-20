import { Op } from 'sequelize';
import { Request, Response, NextFunction } from 'express';
import { Chat, Message, User } from '@/models';
import { applyUserPrivacy } from '@/utils';

const listChats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: 'Not Authenticated!' });
      return;
    }

    const userId = req.userId;

    const chats = await Chat.findAll({
      where: {
        [Op.or]: [
          {
            user1Id: userId,
          },
          {
            user2Id: userId,
          },
        ],
      },
      include: [
        {
          model: User.scope([
            'withProfilePhoto',
            { method: ['withBlockedUsers', { blockedId: userId }] },
            { method: ['withContacts', { addedId: userId }] },
          ]),
          as: 'user1',
          where: {
            id: { [Op.not]: userId },
          },
          required: false,
        },
        {
          model: User.scope([
            'withProfilePhoto',
            { method: ['withBlockedUsers', { blockedId: userId }] },
            { method: ['withContacts', { addedId: userId }] },
          ]),
          as: 'user2',
          where: {
            id: { [Op.not]: userId },
          },
          required: false,
        },
        {
          model: Message,
          as: 'lastMessageForUser1',
          required: false,
          where: {
            '$Chat.user1Id$': userId,
          },
        },
        {
          model: Message,
          as: 'lastMessageForUser2',
          required: false,
          where: {
            '$Chat.user2Id$': userId,
          },
        },
      ],
    });

    const transformedChats = chats.map((chat) => {
      const { id, user1, user2, lastMessageForUser1, lastMessageForUser2 } =
        chat.toJSON();

      const user = user1 || user2;
      if (!user) throw new Error('Invalid chat partner!');

      const partner = applyUserPrivacy(user, {
        requesterIsBlocked: user.blockedUsers
          ? user.blockedUsers.length > 0
          : false,
        requesterIsContact: user.contacts ? user.contacts.length > 0 : false,
      });

      const lastMessage = lastMessageForUser1 || lastMessageForUser2;

      return { id, lastMessage, partner };
    });

    res.status(200).json({
      success: true,
      data: transformedChats,
      message: 'Chats retrieved successfully',
    });
  } catch (err) {
    next(err);
  }
};

export default listChats;
