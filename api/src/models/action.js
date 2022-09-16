const mongoose = require('mongoose');

const Action = new mongoose.Schema({
  chainID: { type: String, required: true },
  name: { type: String, required: true },
  assetName: { type: String, required: true },
  ownerName: { type: String, required: true },
  producer: { type: String, required: true },
  fingerprint: { type: String, required: true },
  description: { type: String, required: true },
  mediaType: { type: String, required: true },
  image: { type: String, required: true },
  imageBase64: { type: String, required: true },
  status: { type: String, required: true },
  actionTypes: { type: Array, required: true },
  actionCollection: { type: String, required: true },
  links: { type: Array },
  files: { type: Array },
  filesBase64: { type: Array },
  price: { type: Number },
  colony: { type: String },
  nftFormat: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Action', Action);
