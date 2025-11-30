import { Request, Response, NextFunction } from 'express';
import { Chat, Message, User } from '@/models';
import { applyUserPrivacy, filterMessageData } from '@/utils';
import socketUsersManager from '@/socket/socketUsersManager';

const listChats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: 'Not Authenticated!' });
      return;
    }

    const userId = req.userId;

    // Here we perform two queries to fetch chats. in the first query this user is known as
    // user1 in the chats table. in the second query this user is known as user2. by doing
    // separate queries for those two cases we fetch the appropriate chat partner and
    // last message of each chat correctly.
    const [chatsAsUser1, chatsAsUser2, unseenMessages] = await Promise.all([
      Chat.findAll({
        where: { user1Id: userId },
        include: [
          {
            model: User.scope([
              'withProfilePhoto',
              { method: ['withBlockedUsers', { blockedId: userId }] },
              { method: ['withContacts', { addedId: userId }] },
            ]),
            as: 'user2',
            required: true,
          },
          {
            model: Message.scope('withAttachment'),
            as: 'lastMessageForUser2',
            required: true,
          },
        ],
      }),

      Chat.findAll({
        where: { user2Id: userId },
        include: [
          {
            model: User.scope([
              'withProfilePhoto',
              { method: ['withBlockedUsers', { blockedId: userId }] },
              { method: ['withContacts', { addedId: userId }] },
            ]),
            as: 'user1',
            required: true,
          },
          {
            model: Message.scope('withAttachment'),
            as: 'lastMessageForUser1',
            required: true,
          },
        ],
      }),

      // Fetch all messages sent to this user which are unread by the user yet. this single
      // query heps us to calculate number of unseen messages for each chat.
      Message.findAll({
        attributes: ['chatId'],
        where: {
          receiverId: userId,
          isSeen: false,
        },
      }),
    ]);

    const transformedChatsAsUser1 = chatsAsUser1.map((chat) => {
      const { id, user2, lastMessageForUser2 } = chat;

      if (!user2) {
        throw new Error('Invalid user2 of a chat!');
      }

      if (!lastMessageForUser2) {
        throw new Error('Invalid lastMessageForUser2 of a chat!');
      }

      const partner = applyUserPrivacy(user2, {
        requesterIsBlocked: !!user2.blockedUsers?.length,
        requesterIsContact: !!user2.contacts?.length,
      });

      partner.isOnline = socketUsersManager.isOnline(partner.id as number);

      const lastMessage = filterMessageData(lastMessageForUser2);

      return { id, partner, lastMessage };
    });

    const transformedChatsAsUser2 = chatsAsUser2.map((chat) => {
      const { id, user1, lastMessageForUser1 } = chat;

      if (!user1) {
        throw new Error('Invalid user1 of a chat!');
      }

      if (!lastMessageForUser1) {
        throw new Error('Invalid lastMessageForUser1 of a chat!');
      }

      const partner = applyUserPrivacy(user1, {
        requesterIsBlocked: !!user1.blockedUsers?.length,
        requesterIsContact: !!user1.contacts?.length,
      });

      partner.isOnline = socketUsersManager.isOnline(partner.id as number);

      const lastMessage = filterMessageData(lastMessageForUser1);

      return { id, partner, lastMessage };
    });

    // Chats transformation steps:
    // #1 Combine both kind of chats
    // #2 Sort chats based on last message's creation time.
    //    A chat with newer last message comes first.
    // #3 Calculate and assign number of unseen messages for each chat.
    const transformedChats = [
      ...transformedChatsAsUser1,
      ...transformedChatsAsUser2,
    ]
      .sort((a, b) => b.lastMessage.createdAt - a.lastMessage.createdAt)
      .map((chat) => ({
        ...chat,
        unseenMessagesCount: unseenMessages.filter(
          (message) => message.chatId === chat.id,
        ).length,
      }));

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
