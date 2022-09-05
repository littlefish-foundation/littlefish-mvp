const mongoose = require('mongoose');

const ActionType = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  count: { type: Number, required: true },
});

module.exports = mongoose.model('ActionType', ActionType);
