import sequelize from '@/config/db';
import { ProfilePhoto, User } from '@/models';

interface Options {
  userId: number;
  name: string;
  originalname: string;
  size: number;
}

const createProfilePhoto = async (options: Options) => {
  const { userId, name, originalname, size } = options;

  const transaction = await sequelize.transaction();

  try {
    const profilePhoto = await ProfilePhoto.create(
      { userId, name, originalname, size },
      { transaction },
    );

    await User.update(
      { profilePhotoId: profilePhoto.id },
      {
        where: { id: userId },
        transaction,
      },
    );

    await transaction.commit();

    return profilePhoto;
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
};

export default createProfilePhoto;
