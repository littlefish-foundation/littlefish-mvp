const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  runningEnvironment: process.env.NODE_ENV,
  dbConnectionUri: process.env.DB_CONNECTION_STRING,
  port: process.env.PORT,
  actionServiceClient: {
    url: process.env.ACTION_SERVICE_URL,
    baseCollectionId: process.env.ACTION_BASE_COLLECTION_ID,
    apiKey: process.env.API_KEY,
  },
};
