const mongoose = require('mongoose');
const { USER_STATUS } = require('../constants');

const user = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: Object.values(USER_STATUS), default: USER_STATUS.PENDING },
  walletAddress: { type: String, required: true, unique: true },
  badgeID: { type: String },
  colony: { ref: 'Colony', type: mongoose.Schema.Types.ObjectId },
  avatar: { type: String, required: true },
  bio: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', user);
