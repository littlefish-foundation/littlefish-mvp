const mongoose = require('mongoose');

const Colony = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  coverImage: { type: String, required: true },
  links: { type: Array },
  files: { type: Array },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Colony', Colony);
