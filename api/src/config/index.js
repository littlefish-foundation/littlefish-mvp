const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  runningEnvironment: process.env.NODE_ENV,
  disableAuth: process.env.DISABLE_AUTH === 'true',
  dbConnectionUri: process.env.DB_CONNECTION_STRING,
  tinyURL: {
    url: process.env.TINY_URL,
    apiToken: process.env.TINY_URL_API_TOKEN,
  },
  port: process.env.PORT,
  actionServiceClient: {
    url: process.env.ACTION_SERVICE_URL,
    apiKey: process.env.TANGOCRYPTO_API_KEY,
  },
  jwtSecret: process.env.JWT_SECRET,
};
