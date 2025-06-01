import { formidable } from 'formidable';
import path from 'node:path';
import fs from 'node:fs/promises';

import {
  PROFILE_PHOTOS_DIR,
  TEMP_FILES_DIR,
  MAX_PROFILE_PHOTO_FILE_SIZE
} from '../../constants';
import { ProfilePhoto, User } from '../../models';
import sequelize from '../../config/db';
import { Request, Response, NextFunction } from 'express';

const uploadPhoto = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'Not Authenticated!' });
    }

    const form = formidable({
      uploadDir: TEMP_FILES_DIR,
      keepExtensions: false
    });

    const formData = await form.parse(req);

    const file = formData?.[1]?.profilePhoto?.[0];

    if (!file) {
      return res.status(400).json({
        message: 'Invalid file'
      });
    }

    if (file.size > MAX_PROFILE_PHOTO_FILE_SIZE) {
      const maxSizeInMB = Math.round(
        MAX_PROFILE_PHOTO_FILE_SIZE / (1024 * 1024)
      );

      // TODO delete the uploaded file
      return res.status(400).json({
        message: `Image file size too big. Maximum allowed size is ${maxSizeInMB} MB`
      });
    }

    const transaction = await sequelize.transaction();

    try {
      const profilePhoto = await ProfilePhoto.create(
        { userId: req.userId },
        { transaction }
      );

      await fs.rename(
        file.filepath,
        path.resolve(PROFILE_PHOTOS_DIR, `${profilePhoto.id}`)
      );

      await User.update(
        { profilePhotoId: profilePhoto.id },
        {
          where: { id: req.userId },
          transaction
        }
      );

      await transaction.commit();

      res.status(200).json({
        success: true,
        data: profilePhoto,
        message: 'Profile photo uploaded successfully'
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
