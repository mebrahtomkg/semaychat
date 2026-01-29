import express, { NextFunction, Request, Response } from 'express';
import { User } from '@/models';

const router = express.Router();

router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    // Hit database to check database health too.
    await User.findByPk(1);

    res.status(200).send('semaychat server is running.');
  } catch (err) {
    next(err);
  }
});

export default router;
