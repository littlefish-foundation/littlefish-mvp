const mongoose = require('mongoose');

const user = new mongoose.Schema({
  name: { type: String, required: true },
  walletAddress: { type: String, required: true, unique: true },
  colony: { ref: 'Colony', type: mongoose.Schema.Types.ObjectId },
  avatar: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', user);
