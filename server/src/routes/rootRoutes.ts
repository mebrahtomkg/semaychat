import express from 'express';
import sequelize from '../config/db';

//Needed to run association by just including '..models/index.js'
import { User } from '../models';

import { hashPassword } from '../utils';

const router = express.Router();

router.get('/setup', async (req, res, next) => {
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
});

export default router;
