import sequelize from '@/config/db';
import { User } from '@/models';

interface LastSeenTimeUpdateProps {
  userId: number;
  lastSeenTime: number;
}

const updateUserLastSeenTime = async ({
  userId,
  lastSeenTime,
}: LastSeenTimeUpdateProps) => {
  const transaction = await sequelize.transaction();

  try {
    await User.update(
      { lastSeenAt: lastSeenTime },
      {
        where: { id: userId },
        transaction,
      },
    );
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export default updateUserLastSeenTime;
