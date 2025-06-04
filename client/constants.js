const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const PUBLIC_PATH = process.env.PUBLIC_PATH || '/';

module.exports = {
  IS_PRODUCTION,
  PUBLIC_PATH
};
