import fs from 'node:fs';
import path from 'node:path';
import { Dialect, Options, Sequelize } from 'sequelize';
import { IS_PRODUCTION, ROOT_DIR } from './general';

const SUPPORTED_DATABASE_DIALECTS: Dialect[] = ['sqlite', 'postgres'];

const dialect: Dialect = (process.env.DATABASE_DIALECT as Dialect) || 'sqlite';

if (!SUPPORTED_DATABASE_DIALECTS.includes(dialect)) {
  throw Error(`Unsupported database dialect: '${dialect}'`);
}

console.log(`Database dialect: ${dialect}`);

const options: Options = {
  dialect,
  logging: IS_PRODUCTION ? false : console.log,
};

let databaseUri: string | undefined;

switch (dialect) {
  case 'sqlite': {
    const sqliteDatabaseDir =
      process.env.SQLITE_DATABASE_DIR || path.resolve(ROOT_DIR, 'database');

    if (!fs.existsSync(sqliteDatabaseDir)) {
      fs.mkdirSync(sqliteDatabaseDir, { recursive: true });
    }

    console.log(`SQLITE_DATABASE_DIR: ${sqliteDatabaseDir}`);

    options.storage = path.resolve(sqliteDatabaseDir, 'app_database.sqlite');
    break;
  }

  case 'postgres': {
    const postgresDatabaseUri = process.env.POSTGRES_DATABASE_URI;
    if (!postgresDatabaseUri) {
      throw new Error(
        'DATABASE_DIALECT is set to "postgres", but POSTGRES_DATABASE_URI is not provided!',
      );
    }

    databaseUri = postgresDatabaseUri;

    console.log(`POSTGRES_DATABASE_URI: ${postgresDatabaseUri}`);

    options.dialectOptions = {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    };
    break;
  }

  default:
  // Do nothing. Unsupported database dialect is handled above.
}

const sequelize = databaseUri
  ? new Sequelize(databaseUri, options)
  : new Sequelize(options);

export default sequelize;

/**
 * Tests the database connection by authenticating with the configured credentials.
 * Throws an error if the connection fails.
 */
export const testDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
  } catch (error) {
    console.error('Failed to connect to the database:');
    throw error;
  }
};
