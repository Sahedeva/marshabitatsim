// /models/astronaut.js
var mongoose = require('mongoose');

var astronautSchema = new mongoose.Schema({
  o2Req: { type: String, required: true },
  foodReq: { type: String, required: true },
  radTol: { type: Number, required: true },
  wasteAmt: { type: Number, required: true },
  created_at: Date,
  updated_at: Date
});

// Make this available to our other files
module.exports = mongoose.model('Astronaut', astronautSchema);;