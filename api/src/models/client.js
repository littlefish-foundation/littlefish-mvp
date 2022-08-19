const mongoose = require('mongoose');

const client = new mongoose.Schema({
  name: { type: String },
  walletAddress: { type: String, required: true },
  colony: { ref: 'Colony', type: mongoose.Schema.Types.ObjectId },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Client', client);
