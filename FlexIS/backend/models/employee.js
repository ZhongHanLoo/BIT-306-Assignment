const mongoose = require ('mongoose');

const employeeSchema = mongoose.Schema({
  employeeId: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  name: {type: String, required: true},
  position: {type: String, required: true},
  email: {type: String, required: true},
  fwaStatus: {type: String, required: true},
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true }
});

module.exports = mongoose.model('Employee', employeeSchema);
