const mongoose = require('mongoose');

const ActionCategory = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('ActionCategory', ActionCategory);
