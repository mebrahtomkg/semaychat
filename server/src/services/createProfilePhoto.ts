import { ProfilePhoto, User } from '@/models';
import { Transaction } from 'sequelize';

interface Options {
  userId: number;
  name: string;
  originalname: string;
  size: number;
  transaction: Transaction;
}

const createProfilePhoto = async (options: Options) => {
  const { userId, name, originalname, size, transaction } = options;

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

  return profilePhoto;
};

export default createProfilePhoto;
