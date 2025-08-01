import 'dotenv/config'; // Must be at the top of app entry file.
import setup from './setup';
import {
  ALLOWED_ORIGINS,
  FILES_STORAGE_DIR,
  FILES_STORAGE_TYPE,
  PORT
} from './constants';
import app from './app';
import { createServer } from 'node:http';
import initSocket from './socket';
import { databaseConfig } from './config/db';

// Perform setups before the server starts.
setup();

const httpServer = createServer(app);

// Initialize Socket.IO
initSocket(httpServer);

httpServer.listen(PORT, () => {
  console.log(`SemayChat server running on port ${PORT}`);
  const allowedOrigins = ALLOWED_ORIGINS.join('  ');
  console.log(
    'Allowed origins:',
    allowedOrigins || 'No origin is allowed. browsers maynot work!'
  );
  console.log('Database config:', databaseConfig);

  console.log('Files storage type:', FILES_STORAGE_TYPE);

  console.log('Files storage dir:', FILES_STORAGE_DIR);
});
