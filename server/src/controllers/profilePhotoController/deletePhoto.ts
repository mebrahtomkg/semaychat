import { ProfilePhoto } from '../../models';
import { Request, Response, NextFunction } from 'express';
import { isPositiveInteger } from '../../utils';

const deletePhoto = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(
      typeof req.params.photoId === 'string' ? req.params.photoId.trim() : '',
      10,
    );

    if (!isPositiveInteger(id)) {
      return res.status(400).json({
        message: 'Invalid profile photo id.',
      });
    }

    const photo = await ProfilePhoto.findByPk(id);

    if (!photo) {
      return res.status(404).json({
        message: 'Profile photo not found',
      });
    }

    if (photo.userId !== req.userId) {
      return res.status(403).json({
        message: 'That profile photo is not yours to delete',
      });
    }

    await ProfilePhoto.destroy({ where: { id } });
    //TODO delete the actual photo file

    res.status(200).json({
      success: true,
      message: 'Photo deleted successfully.',
    });
  } catch (err) {
    next(err);
  }
};

export default deletePhoto;
