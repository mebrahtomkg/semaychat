import express, { NextFunction, Request, Response } from 'express';
import sequelize from '@/config/db';
import { hashPassword } from '@/utils';

//Needed to run association by just including '..models/index.js'
import { User } from '@/models';

const router = express.Router();

router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    // Hit database to check database health
    await User.findByPk(1);

    res.status(200).send('semaychat server is running.');
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
          password: await hashPassword('tttt'),
        },
        {
          firstName: 'Edge',
          email: 'e@e.c',
          password: await hashPassword('eeee'),
        },
        {
          firstName: 'Firefox',
          email: 'f@e.c',
          password: await hashPassword('ffff'),
        },
        {
          firstName: 'Safari',
          email: 's@e.c',
          password: await hashPassword('ssss'),
        },
        {
          firstName: 'Opera',
          email: 'o@e.c',
          password: await hashPassword('oooo'),
        },
        {
          firstName: 'Bravo',
          email: 'b2@e.c',
          password: await hashPassword('bbbb'),
        },
        {
          firstName: 'Jackson',
          email: 'b3@e.c',
          password: await hashPassword('bbbb'),
        },
        {
          firstName: 'Merit',
          email: 'b4@e.c',
          password: await hashPassword('bbbb'),
        },
        {
          firstName: 'Abrham',
          email: 'b5@e.c',
          password: await hashPassword('bbbb'),
        },
        {
          firstName: 'Sansa',
          email: 'b6@e.c',
          password: await hashPassword('bbbb'),
        },
        {
          firstName: 'Sofiya',
          email: 'b7@e.c',
          password: await hashPassword('bbbb'),
        },
        {
          firstName: 'Taiwen',
          email: 'b8@e.c',
          password: await hashPassword('bbbb'),
        },
        {
          firstName: 'Muez',
          email: 'b9@e.c',
          password: await hashPassword('bbbb'),
        },
        {
          firstName: 'Bob',
          email: 'b10@e.c',
          password: await hashPassword('bbbb'),
        },
      ]);

      res.status(200).json({
        message: `Models were synchronized successfully. eg. ${User.tableName}`,
        users,
      });
    } catch (err) {
      next(err);
    }
  },
);

export default router;
