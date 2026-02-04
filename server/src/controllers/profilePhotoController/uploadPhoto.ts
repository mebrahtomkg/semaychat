import { Request, Response, NextFunction } from 'express';
import {
  MAX_PROFILE_PHOTO_FILE_SIZE,
  PROFILE_PHOTOS_BUCKET,
} from '@/config/general';
import storage from '@/config/storage';
import multer from 'multer';
import path from 'node:path';
import { createProfilePhoto } from '@/services';
import sequelize from '@/config/db';

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

const profilePhotoUploaderAsync = (
  req: Request,
  res: Response,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    profilePhotoUploader(req, res, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

const uploadPhoto = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: 'Not Authenticated!' });
      return;
    }

    try {
      await profilePhotoUploaderAsync(req, res);
    } catch (uploadErr) {
      const { message: errorMessage } = uploadErr as Error;
      switch (errorMessage) {
        case UPLOAD_ERRORS.fileTypeError:
          res.status(400).json({ message: errorMessage });
          return;

        default:
          throw uploadErr;
      }
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
      const profilePhoto = await createProfilePhoto({
        userId: req.userId,
        name: path.basename(filePath),
        originalname,
        size,
        transaction,
      });

      await transaction.commit();

      res.status(200).json({
        success: true,
        data: profilePhoto.toJSON(),
        message: 'Profile photo uploaded successfully',
      });
    } catch (err) {
      await transaction.rollback();
      await storage.deleteFile(PROFILE_PHOTOS_BUCKET, filePath);
      throw err;
    }
  } catch (error) {
    next(error);
  }
};

export default uploadPhoto;
