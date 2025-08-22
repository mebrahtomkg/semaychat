import { PROFILE_PHOTOS_BUCKET } from '@/config/general';
import storage from '@/config/storage';
import { ProfilePhoto } from '@/models';
import { isPositiveInteger } from '@/utils';
import { Request, Response, NextFunction } from 'express';

const deletePhoto = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const photoId = parseInt(
      typeof req.params.photoId === 'string' ? req.params.photoId.trim() : '',
      10,
    );

    if (!isPositiveInteger(photoId)) {
      res.status(400).json({
        message: 'Invalid profile photo id.',
      });
      return;
    }

    const photo = await ProfilePhoto.findByPk(photoId);

    if (!photo) {
      res.status(404).json({
        message: 'Profile photo not found',
      });
      return;
    }

    if (photo.userId !== req.userId) {
      res.status(403).json({
        message: 'That profile photo is not yours to delete',
      });
      return;
    }

    // First make the file get deleted, i.e instead of using database transaction.
    // this avoid making database busy. If file delete will not success, error will be thrown.
    // this error prevent the photo record from bing deleted from database.
    await storage.deleteFile(PROFILE_PHOTOS_BUCKET, photoId);

    await ProfilePhoto.destroy({
      where: { id: photoId },
    });

    res.status(200).json({
      success: true,
      message: 'Photo deleted successfully.',
    });
  } catch (err) {
    next(err);
  }
};

export default deletePhoto;
