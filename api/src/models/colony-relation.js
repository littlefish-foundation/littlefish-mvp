const mongoose = require('mongoose');

const colonyRelation = new mongoose.Schema({
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Colony', required: true },
  sub: { type: mongoose.Schema.Types.ObjectId, ref: 'Colony', required: true },
});

module.exports = mongoose.model('ColonyRelation', colonyRelation);
