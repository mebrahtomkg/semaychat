import path from 'node:path';
import { Sequelize } from 'sequelize';
import { SQLITE_DATABASE_DIR } from '../constants';

// const sequelize = new Sequelize({
//   dialect: 'mysql',
//   dialectOptions: {
//     host: 'localhost',
//     user: 'test',
//     password: '1234',
//     database: 'testdb'
//   }
// });

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(SQLITE_DATABASE_DIR, 'app_database.sqlite')
});

export default sequelize;
