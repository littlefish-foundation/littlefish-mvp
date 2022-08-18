const mongoose = require('mongoose');

const colony = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  coverImage: { type: String, required: true },
  walletAddress: { type: String, required: true },
  files: { type: Array },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
colony.add({ superColony: colony });

module.exports = mongoose.model('Colony', colony);
