const mongoose = require('mongoose');

const ColonyActionType = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  colony: { type: String, required: true },
  count: { type: Number, required: true },
});

module.exports = mongoose.model('ColonyActionType', ColonyActionType);
