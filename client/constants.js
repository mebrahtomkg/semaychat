const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const PUBLIC_PATH = IS_PRODUCTION ? process.env.PUBLIC_PATH : '/';

const API_URL = IS_PRODUCTION
  ? process.env.API_URL
  : 'http://localhost:3000/api';

module.exports = {
  IS_PRODUCTION,
  PUBLIC_PATH,
  API_URL
};
