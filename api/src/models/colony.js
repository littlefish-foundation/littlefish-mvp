const mongoose = require('mongoose');

const colony = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  coverImage: { type: String, required: true },
  walletAddress: { type: String, required: true },
  rewardSharing: {
    colony: { type: Number, required: true },
    members: { type: Number, required: true },
  },
  files: { type: Array },
  links: { type: Object },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Colony', colony);
