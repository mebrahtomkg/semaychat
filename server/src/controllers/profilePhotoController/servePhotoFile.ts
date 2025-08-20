import { Request, Response, NextFunction } from 'express';
import { getFileExtension, isPositiveInteger } from '@/utils';
import { ProfilePhoto } from '@/models';
import mime from 'mime-types';
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

    const result = await storage.getFile(
      PROFILE_PHOTOS_BUCKET,
      profilePhoto.id,
    );

    if (typeof result === 'string') {
      res.status(200).sendFile(result);
    } else {
      res.setHeader(
        'Content-Type',
        mime.lookup(profilePhoto.name) || 'application/octet-stream',
      );

      const ext = getFileExtension(profilePhoto.name);

      res.setHeader(
        'Content-Disposition',
        `inline; filename="${profilePhoto.id}.${ext}"`,
      );

      res.setHeader('Content-Length', result.length);

      res.status(200).send(result);
    }
  } catch (err) {
    next(err);
  }
};

export default servePhotoFile;
