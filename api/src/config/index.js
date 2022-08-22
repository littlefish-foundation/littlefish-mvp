const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  dbConnectionUri: process.env.DB_CONNECTION_STRING,
  port: process.env.PORT,
  actionServiceClient: {
    url: process.env.ACTION_SERVICE_URL,
    baseCollectionId: process.env.ACTION_BASE_COLLECTION_ID,
    apiKey: process.env.API_KEY,
  },
  aws: {
    accessKey: {
      id: process.env.AWS_S3_ACCESS_KEY_ID,
      bucketName: process.env.AWS_S3_BUCKET_NAME,
      secret: process.env.AWS_S3_SECRET_ACCESS_KEY,
    },
  },
};
