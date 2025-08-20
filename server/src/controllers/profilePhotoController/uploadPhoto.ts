import { Request, Response, NextFunction } from 'express';
import sequelize from '@/config/db';
import { ProfilePhoto, User } from '@/models';
import {
  MAX_PROFILE_PHOTO_FILE_SIZE,
  PROFILE_PHOTOS_BUCKET,
} from '@/config/general';
import storage from '@/config/storage';

const uploadPhoto = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: 'Not Authenticated!' });
      return;
    }

    const file = req.file;

    if (!file) {
      res.status(400).json({
        message: 'No file provided!',
      });
      return;
    }

    const { path: filepath, size, originalname: name } = file;

    if (size > MAX_PROFILE_PHOTO_FILE_SIZE) {
      const maxSizeInMB = Math.round(
        MAX_PROFILE_PHOTO_FILE_SIZE / (1024 * 1024),
      );

      res.status(400).json({
        message: `Image file size too big. Maximum allowed size is ${maxSizeInMB} MB`,
      });

      // TODO delete the uploaded file
      return;
    }

    const transaction = await sequelize.transaction();

    try {
      const profilePhoto = await ProfilePhoto.create(
        { userId: req.userId, name, size },
        { transaction },
      );

      await storage.saveFile(PROFILE_PHOTOS_BUCKET, filepath, profilePhoto.id);

      await User.update(
        { profilePhotoId: profilePhoto.id },
        {
          where: { id: req.userId },
          transaction,
        },
      );

      await transaction.commit();

      res.status(200).json({
        success: true,
        data: profilePhoto,
        message: 'Profile photo uploaded successfully',
      });
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  } catch (error) {
    next(error);
  }
};

export default uploadPhoto;
