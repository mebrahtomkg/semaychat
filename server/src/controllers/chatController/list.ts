import { Op } from 'sequelize';
import { Chat, Message, User } from '../../models';
import { applyUserPrivacy } from '../../utils';
import { Request, Response, NextFunction } from 'express';

const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const requesterId = req.userId;

    const chats = await Chat.findAll({
      where: {
        [Op.or]: [{ user1Id: requesterId }, { user2Id: requesterId }]
      },
      include: [
        {
          model: User.scope([
            'withProfilePhoto',
            { method: ['withBlockedUsers', { blockedId: requesterId }] },
            { method: ['withContacts', { addedId: requesterId }] }
          ]),
          as: 'user1',
          where: {
            id: { [Op.not]: requesterId }
          },
          required: false
        },
        {
          model: User.scope([
            'withProfilePhoto',
            { method: ['withBlockedUsers', { blockedId: requesterId }] },
            { method: ['withContacts', { addedId: requesterId }] }
          ]),
          as: 'user2',
          where: {
            id: { [Op.not]: requesterId }
          },
          required: false
        },
        {
          model: Message,
          as: 'lastMessageForUser1',
          required: false,
          where: {
            '$Chat.user1Id$': requesterId
          }
        },
        {
          model: Message,
          as: 'lastMessageForUser2',
          required: false,
          where: {
            '$Chat.user2Id$': requesterId
          }
        }
      ]
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
        requesterIsContact: user.contacts ? user.contacts.length > 0 : false
      });

      const lastMessage = lastMessageForUser1 || lastMessageForUser2;

      return { id, lastMessage, partner };
    });

    res.status(200).json({
      success: true,
      data: transformedChats,
      message: 'Chats retrieved successfully'
    });
  } catch (err) {
    next(err);
  }
};

export default list;
