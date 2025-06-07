import app from './app';
import { ALLOWED_ORIGINS, PORT } from './constants';
import setup from './setup';

// Perform setups before the server starts.
setup();

app.listen(PORT, () => {
  console.log(`Chat server running on port ${PORT}`);
  const allowedOrigins = ALLOWED_ORIGINS.join('  ');
  console.log(
    'Allowed origins:',
    allowedOrigins || 'No origin is allowed. browsers maynot work!'
  );
});
