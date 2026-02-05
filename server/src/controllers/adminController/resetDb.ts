import { resetDatabase } from '@/services';
import { Request, Response, NextFunction } from 'express';

const resetDb = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY;

    const adminSecretKey = req.headers['x-admin-secret-key'];

    if (!ADMIN_SECRET_KEY || ADMIN_SECRET_KEY.length < 10) {
      res.status(500).json({
        message: 'Server configuration error.',
      });
      return;
    }

    if (adminSecretKey !== ADMIN_SECRET_KEY) {
      res.status(401).json({
        message: 'Incorrect or invalid admin secret key!',
      });
      return;
    }

    await resetDatabase();

    res.status(200).json({
      success: true,
      message: 'Database reset successful.',
    });
  } catch (err) {
    next(err);
  }
};

export default resetDb;
