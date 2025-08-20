import { ProfilePhoto } from '../../models';
import { Request, Response, NextFunction } from 'express';

const listMyPhotos = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const profilePhotos = await ProfilePhoto.findAll({
      where: { userId: req.userId },
      order: [['createdAt', 'DESC']],
      limit: 200,
    });

    res.status(200).json({
      success: true,
      data: profilePhotos,
      message: 'Profile photos fetched successfully.',
    });
  } catch (err) {
    next(err);
  }
};

export default listMyPhotos;
