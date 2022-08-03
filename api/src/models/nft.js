const mongoose = require('mongoose');

const Nft = new mongoose.Schema({
  asset_name: { type: String, required: true },
  nftId: { type: String, required: true },
  name: { type: String, required: true },
  fingerprint: { type: String, required: true },
  description: { type: String },
  media_type: { type: String, required: true },
  image: { type: String, required: true },
  status: { type: String, required: true },
  files: { type: Array, required: true },
  price: { type: Number },
  metadata: { type: Object, required: true },
  custom_attributes: { type: Object },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Nft', Nft);
