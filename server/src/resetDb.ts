import './sideEffects'; // Side effects import.

import { IS_PRODUCTION } from '@/config/general';
import { resetDatabase } from './services';

const run = async () => {
  if (IS_PRODUCTION) {
    console.error('Database reset is not allowed in production!');
    return;
  }

  await resetDatabase();
};

run();
