import app from './app';
import { PORT } from './constants';

app.listen(PORT, () => {
  console.log(`Chat server running on port ${PORT}`);
});
