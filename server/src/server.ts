import 'dotenv/config'; // Side effect import to load env vars. Must be the first thing to do.
import '@/config/general'; // Side effect import to configure and setup app
import '@/config/db'; // Side effect import to configure and setup database
import '@/config/storage'; // Side effect import to configure and setup storage.

import { testDatabaseConnection } from '@/config/db';
import { createServer } from 'node:http';
import app from './app';
import initSocket from './socket';
import { PORT } from '@/config/general';

const startServer = async () => {
  // Test database connection before the server starts.
  await testDatabaseConnection();

  const httpServer = createServer(app);

  // Initialize Socket.IO
  initSocket(httpServer);

  httpServer.listen(PORT, () => {
    console.log(`SemayChat server running on port ${PORT}`);
  });
};

startServer();
