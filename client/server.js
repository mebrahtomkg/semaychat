require('dotenv').config();
const express = require('express');
const path = require('node:path');
const { PUBLIC_PATH } = require('./constants');

const app = express();

const PORT = 8080;

const DIST_DIR = path.resolve(__dirname, 'dist');

app.use(PUBLIC_PATH, express.static(DIST_DIR));

app.listen(PORT, () => {
  console.log(`Production test server running on ${PORT}`);
});
