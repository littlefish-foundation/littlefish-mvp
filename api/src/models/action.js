const mongoose = require('mongoose');

const Action = new mongoose.Schema({
  actionId: { type: String, required: true },
  name: { type: String, required: true },
  assetName: { type: String, required: true },
  ownerName: { type: String, required: true },
  fingerprint: { type: String, required: true },
  description: { type: String, required: true },
  mediaType: { type: String, required: true },
  image: { type: String, required: true },
  status: { type: String, required: true },
  actionType: { type: String, required: true },
  youtubeLink: { type: String },
  otherLink: { type: String },
  actionCollection: { type: String, required: true },
  files: { type: Array },
  price: { type: Number },
  nftFormat: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Action', Action);
