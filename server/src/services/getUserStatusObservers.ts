import { BlockedUser, Chat, Contact, User } from '@/models';
import { chunkArray } from '@/utils';
import { Op } from 'sequelize';

const getUserStatusObservers = async (userId: number): Promise<number[]> => {
  const user = await User.findByPk(userId, {
    include: [
      {
        model: Contact,
        as: 'contacts',
      },
      {
        model: BlockedUser,
        as: 'blockedUsers',
      },
      {
        model: Chat,
        as: 'chatsWithUser2',
      },
      {
        model: Chat,
        as: 'chatsWithUser1',
      },
    ],
  });

  if (!user) {
    throw new Error('User not found');
  }

  if (user.lastSeenVisibility === 'nobody') {
    return [];
  }

  const {
    contacts = [],
    blockedUsers = [],
    chatsWithUser1 = [],
    chatsWithUser2 = [],
  } = user;

  const observers: Set<number> = new Set();

  contacts.forEach((contact) => {
    observers.add(contact.addedId);
  });

  if (user.lastSeenVisibility === 'everybody') {
    chatsWithUser1.forEach((chat) => {
      observers.add(chat.user1Id);
    });

    chatsWithUser2.forEach((chat) => {
      observers.add(chat.user2Id);
    });
  }

  for (const blockedUser of blockedUsers) {
    observers.delete(blockedUser.blockedId);
  }

  const chunks = chunkArray(Array.from(observers), 500);
  for (const chunk of chunks) {
    const blockers = await BlockedUser.findAll({
      where: {
        blockerId: {
          [Op.in]: chunk,
        },
        blockedId: userId,
      },
    });
    for (const blocker of blockers) {
      observers.delete(blocker.blockerId);
    }
  }

  return Array.from(observers);
};

export default getUserStatusObservers;
