import ProfilePhoto from '../../models/ProfilePhoto';
import { Request, Response, NextFunction } from 'express';

const listUserPhotos = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = parseInt(
      typeof req.params.userId === 'string' ? req.params.userId.trim() : '',
      10,
    );

    if (!Number.isInteger(userId) || userId <= 0) {
      return res.status(400).json({
        message: 'Invalid user id.',
      });
    }

    const profilePhotos = await ProfilePhoto.findAll({ where: { userId } });

    res.status(200).json({
      success: true,
      data: profilePhotos,
      message: 'Profile photos fetched successfully.',
    });
  } catch (err) {
    next(err);
  }
};

export default listUserPhotos;
