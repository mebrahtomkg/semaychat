import { Request, Response, NextFunction } from 'express';
import { isPositiveInteger } from '../utils';

const authGuard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!isPositiveInteger(req.userId)) {
      res.status(401).json({
        message: 'You are not logged in.'
      });
      return;
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default authGuard;
