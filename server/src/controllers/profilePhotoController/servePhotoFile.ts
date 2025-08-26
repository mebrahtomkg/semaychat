import { Request, Response, NextFunction } from 'express';
import { isPositiveInteger } from '@/utils';
import { ProfilePhoto } from '@/models';
import storage from '@/config/storage';
import { PROFILE_PHOTOS_BUCKET } from '@/config/general';

const servePhotoFile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const photoId = Number.parseInt(
      typeof req.params.photoId === 'string' ? req.params.photoId : '',
      10,
    );

    if (!isPositiveInteger(photoId)) {
      res.status(400).json({
        message: 'Invalid profile photo id.',
      });
      return;
    }

    const profilePhoto = await ProfilePhoto.findByPk(photoId);

    if (!profilePhoto) {
      res.status(404).json({
        message: 'Profile photo not found.',
      });
      return;
    }

    await storage.serveFile(PROFILE_PHOTOS_BUCKET, profilePhoto.name, res);
  } catch (err) {
    next(err);
  }
};

export default servePhotoFile;
