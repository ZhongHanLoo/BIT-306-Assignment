const mongoose = require ('mongoose');

const fwaRequestSchema = mongoose.Schema({
  requestId: {type: String, required: true, unique: true},
  requestDate: {type: Date, required: true},
  workType: {type: String, required: true},
  description: {type: String, required: true},
  reason: {type: String, required: true},
  status: {type: String, required: true},
  comment: {type: String, required: true},
});

module.exports = mongoose.model('FWARequest', fwaRequestSchema);
