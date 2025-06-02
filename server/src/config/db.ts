import path from 'node:path';
import { Sequelize } from 'sequelize';
import { DATABASE_DIR } from '../constants';
import fs from 'node:fs';

// const sequelize = new Sequelize({
//   dialect: 'mysql',
//   dialectOptions: {
//     host: 'localhost',
//     user: 'test',
//     password: '1234',
//     database: 'testdb'
//   }
// });

if (!fs.existsSync(DATABASE_DIR)) {
  fs.mkdirSync(DATABASE_DIR, { recursive: true });
}

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(DATABASE_DIR, 'app_database.sqlite')
});

export default sequelize;
