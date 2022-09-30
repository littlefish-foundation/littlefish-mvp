const mongoose = require('mongoose');

const Action = new mongoose.Schema({
  chainID: { type: String, required: true },
  name: { type: String, required: true },
  assetName: { type: String, required: true },
  producerName: { type: String, required: true },
  producer: { type: String, required: true },
  fingerprint: { type: String, required: true },
  description: { type: String, required: true },
  mediaType: { type: String, required: true },
  image: { type: String, required: true },
  status: { type: String, required: true },
  types: { type: Array, required: true },
  actionCollection: { type: String, required: true },
  links: { type: Array },
  files: { type: Array },
  minimumPrice: { type: Number, default: 0 },
  ulid: { type: String, required: true },
  mintDate: { type: Number, required: true },
  colony: { type: String },
  dbImage: { type: String },
  dbFiles: { type: String },
  rawActionFormat: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Action', Action);
