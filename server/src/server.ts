import setup from './setup';
import { ALLOWED_ORIGINS, PORT } from './constants';
import app from './app';
import { createServer } from 'node:http';
import initSocket from './socket';

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
});
