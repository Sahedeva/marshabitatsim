// /models/environment.js
var mongoose = require('mongoose');

var environmentSchema = new mongoose.Schema({
  tempAvg: { type: Number, required: true },
  radLvl: { type: Number, required: true },
  loc: { type: Array, required: true },
  geoFtrs: { type: Array, required: true },
  created_at: Date,
  updated_at: Date
});

// Make this available to our other files
module.exports = mongoose.model('Environment', environmentSchema);