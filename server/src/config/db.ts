import path from 'node:path';
import { Dialect, Options, Sequelize } from 'sequelize';
import { SQLITE_DATABASE_DIR } from '@/constants';

const options: Options = {
  dialect: (process.env.DB_DIALECT as Dialect) || 'sqlite',
  logging: false
};

let DATABASE_URI: string | undefined = undefined;

switch (options.dialect) {
  case 'sqlite':
    options.storage =
      process.env.SQLITE_DB_STORAGE ||
      path.resolve(SQLITE_DATABASE_DIR, 'app_database.sqlite');
    break;

  case 'postgres': {
    const POSTGRES_DATABASE_URI = process.env.POSTGRES_DATABASE_URI;
    if (!POSTGRES_DATABASE_URI) {
      console.error(
        'postgres is set as DB_DIALECT, but POSTGRES_DATABASE_URI environment variable is not set!'
      );
      process.exit(1);
    }
    DATABASE_URI = POSTGRES_DATABASE_URI;
    options.dialectOptions = {
      ssl: {
        require: true, // This enforces SSL
        rejectUnauthorized: false
      }
    };
  }
}

const sequelize = DATABASE_URI
  ? new Sequelize(DATABASE_URI, options)
  : new Sequelize(options);

export default sequelize;

export const databaseConfig = {
  uri: DATABASE_URI,
  ...options
};
