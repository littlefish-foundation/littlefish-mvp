const { IPFS_SERVER_PREFIX, IPFS_FILE_PREFIX } = require('../constants');

function prepareImageURL(url) {
  return IPFS_SERVER_PREFIX + url.replace(IPFS_FILE_PREFIX, '');
}

function prepareAllImageURLsInFile(files) {
  return ([] || files).map((file) => {
    const fileToMap = JSON.parse(JSON.stringify(file));
    if (fileToMap.metadata_attributes[0].tag === '<mime_type>'
        && fileToMap.metadata_attributes[0].value.includes('image')
         && fileToMap.metadata_attributes[1].tag === '<src>') {
      fileToMap.metadata_attributes[1].value = prepareImageURL(fileToMap.metadata_attributes[1].value);
    }
    return fileToMap;
  });
}

module.exports = {
  prepareImageURL,
  prepareAllImageURLsInFile,
};
