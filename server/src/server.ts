import './sideEffects'; // Side effects import.

import { testDatabaseConnection } from '@/config/db';
import { createServer } from 'node:http';
import app from './app';
import initSocket from './socket';
import { PORT } from '@/config/general';

const startServer = async () => {
  // Test database connection before the server starts.
  await testDatabaseConnection();

  // Create server
  const httpServer = createServer(app);

  // Initialize Socket.IO
  initSocket(httpServer);

  httpServer.listen(PORT, () => {
    console.log(`SemayChat server running on port ${PORT}`);
  });
};

startServer();
