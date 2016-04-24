// /models/lab.js
var mongoose = require('mongoose');

var labSchema = new mongoose.Schema({
	title: { type: String, required:true },
  equip: { type: Array, required: true },
  size: { type: Array, required: true },
  created_at: Date,
  updated_at: Date
});

var Lab = mongoose.model('Lab', labSchema);

// Make this available to our other files
module.exports = Lab;