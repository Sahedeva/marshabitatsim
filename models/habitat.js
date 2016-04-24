// /models/habitat.js
var mongoose = require('mongoose');

var habitatSchema = new mongoose.Schema({
	astroModelId: { type: String, required: true },
	envirModelId: { type: String, required: true },
	labModelId: { type: String, required: true },
  numAstro: { type: Number, required: true },
  labArray: { type: Array, required: true },
  equipObj: { type: Object, required: true },
  roomObj: { type: Object, required: true },
  totVol: { type: Array, required: true },
  created_at: Date,
  updated_at: Date
});

var Habitat = mongoose.model('Habitat', habitatSchema);

// Make this available to our other files
module.exports = Habitat;