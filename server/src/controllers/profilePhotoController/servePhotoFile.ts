import path from 'node:path';
import ProfilePhoto from '../../models/ProfilePhoto';
import { PROFILE_PHOTOS_DIR } from '../../constants';
import { Request, Response, NextFunction } from 'express';
import { isPositiveInteger } from '../../utils';

const servePhotoFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(
      typeof req.params.photoId === 'string' ? req.params.photoId : '',
      10
    );

    if (!isPositiveInteger(id)) {
      return res.status(400).json({
        message: 'Invalid profile photo id.'
      });
    }

    const profilePhoto = await ProfilePhoto.findByPk(id);

    if (!profilePhoto) {
      return res.status(404).json({
        message: 'Profile photo not found.'
      });
    }

    const absPath = path.resolve(PROFILE_PHOTOS_DIR, `${profilePhoto.id}`);

    res.status(200).sendFile(absPath);
  } catch (err) {
    next(err);
  }
};

export default servePhotoFile;
