import 'dotenv/config'; // Must be at the top of app entry file.
import setup from './setup';
import { ALLOWED_ORIGINS, FILES_STORAGE_DIR, PORT } from './constants';
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
  console.log(`Chat server running on port ${PORT}`);
  const allowedOrigins = ALLOWED_ORIGINS.join('  ');
  console.log(
    'Allowed origins:',
    allowedOrigins || 'No origin is allowed. browsers maynot work!'
  );
  console.log('Database config:', databaseConfig);
  console.log('Files storage dir:', FILES_STORAGE_DIR);
});
