import { User } from '@/models';
import { chunkArray } from '@/utils';
import { Op } from 'sequelize';

const updateUsersLastSeenTime = async (
  usersId: number[],
  lastSeenTime: number,
) => {
  const chunks = chunkArray(usersId, 500);
  for (const chunk of chunks) {
    await User.update(
      { lastSeenAt: lastSeenTime },
      {
        where: {
          id: { [Op.in]: chunk },
        },
      },
    );
  }
};

export default updateUsersLastSeenTime;
