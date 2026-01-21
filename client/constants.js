const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const PUBLIC_PATH = process.env.PUBLIC_PATH || '/';

const API_URL = process.env.API_URL;

module.exports = {
  IS_PRODUCTION,
  PUBLIC_PATH,
  API_URL,
};
