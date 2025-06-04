import app from './app';
import { PORT } from './constants';
import setup from './setup';

// Perform setups before the server starts.
setup(); 

app.listen(PORT, () => {
  console.log(`Chat server running on port ${PORT}`);
}); 
