const aws = require('aws-sdk');

async function s3GeneratePreSignedUrl(name, type = 'image/png') {
  const s3 = new aws.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  });
  const preSignedUrl = await s3.getSignedUrlPromise('putObject', {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: name,
    ContentType: type,
    Expires: 300,
  });

  return {
    preSignedUrl,
  };
}

module.exports = s3GeneratePreSignedUrl;
