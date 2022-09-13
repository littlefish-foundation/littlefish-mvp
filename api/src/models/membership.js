const mongoose = require('mongoose');

const membership = new mongoose.Schema({
  walletAddress: { type: String, required: true },
  assetID: { type: String, required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Membership', membership);
