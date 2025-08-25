import { Request, Response, NextFunction } from 'express';
import sequelize from '@/config/db';
import { ProfilePhoto, User } from '@/models';
import {
  MAX_PROFILE_PHOTO_FILE_SIZE,
  PROFILE_PHOTOS_BUCKET,
} from '@/config/general';
import storage from '@/config/storage';
import multer from 'multer';
import path from 'node:path';

const UPLOAD_ERRORS = {
  fileTypeError: 'Invalid file type! Only image is allowed',
};

const profilePhotoUploader = multer({
  storage: storage.createStorageEngine(PROFILE_PHOTOS_BUCKET),
  limits: {
    files: 1,
    fileSize: MAX_PROFILE_PHOTO_FILE_SIZE,
  },
  fileFilter: (_req, file, callback) => {
    if (!file.mimetype.startsWith('image/')) {
      callback(new Error(UPLOAD_ERRORS.fileTypeError));
      return;
    }

    callback(null, true);
  },
}).single('profilePhoto');

const uploadPhoto = async (req: Request, res: Response, next: NextFunction) => {
  try {
    profilePhotoUploader(req, res, async (uploadError) => {
      if (uploadError) {
        if (uploadError.message === UPLOAD_ERRORS.fileTypeError) {
          res.status(400).json({ message: UPLOAD_ERRORS.fileTypeError });
          return;
        } else {
          next(uploadError);
          return;
        }
      }

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

      const { path: filePath, size, originalname } = file;

      const transaction = await sequelize.transaction();

      try {
        const profilePhoto = await ProfilePhoto.create(
          {
            userId: req.userId,
            name: path.basename(filePath),
            originalname,
            size,
          },
          { transaction },
        );

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
          data: profilePhoto.toJSON(),
          message: 'Profile photo uploaded successfully',
        });
      } catch (err) {
        await transaction.rollback();
        next(err);
      }
    });
  } catch (error) {
    next(error);
  }
};

export default uploadPhoto;
