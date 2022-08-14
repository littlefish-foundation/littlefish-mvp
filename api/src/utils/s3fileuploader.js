const aws = require('aws-sdk');

async function uploadFileToS3(file) {
  const s3 = new aws.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  });

  const uploadedImage = await s3.upload({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: file.name,
    Body: file.blob,
  }).promise();

  return uploadedImage.Location;
}

module.exports = uploadFileToS3;
