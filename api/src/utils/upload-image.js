const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadImage = async (file) => {
  // convert base64 file to buffer and write to file inside uploads folder asynchronously
  const buffer = Buffer.from(file, 'base64');
  const fileName = `${uuidv4()}.jpg`;
  const filePath = path.join(__dirname, '..', '..', 'images', fileName);
  try {
    await fs.writeFile(filePath, buffer);
  } catch (e) {
    console.log(e);
    return '';
  }
  return fileName;
};

module.exports = uploadImage;
