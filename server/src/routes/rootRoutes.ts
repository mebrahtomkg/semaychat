import express, { NextFunction, Request, Response } from 'express';
import sequelize from '@/config/db';
import { hashPassword } from '@/utils';

//Needed to run association by just including '..models/index.js'
import { User } from '@/models';

const router = express.Router();

router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send('SemayChat backend server is running.');
  } catch (err) {
    next(err);
  }
});

router.get(
  '/setup',
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      await sequelize.sync({ force: true });

      const users = await User.bulkCreate([
        {
          firstName: 'Tom',
          email: 't@e.c',
          password: await hashPassword('tttt')
        },
        {
          firstName: 'Edge',
          email: 'e@e.c',
          password: await hashPassword('eeee')
        },
        {
          firstName: 'Firefox',
          email: 'f@e.c',
          password: await hashPassword('ffff')
        },
        {
          firstName: 'Safari',
          email: 's@e.c',
          password: await hashPassword('ssss')
        },
        {
          firstName: 'Opera',
          email: 'o@e.c',
          password: await hashPassword('oooo')
        },
        {
          firstName: 'Bravo',
          email: 'b@e.c',
          password: await hashPassword('bbbb')
        }
      ]);

      res.status(200).json({
        message: `Models were synchronized successfully. eg. ${User.tableName}`,
        users
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
