const mongoose = require('mongoose');

const colonyShowcaseAction = new mongoose.Schema({
  colony: { type: mongoose.Schema.Types.ObjectId, ref: 'Colony', required: true },
  action: { type: mongoose.Schema.Types.ObjectId, ref: 'Action', required: true },
});

module.exports = mongoose.model('ColonyShowcaseAction', colonyShowcaseAction);
