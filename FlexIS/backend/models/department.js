const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema({
  departmentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
});

module.exports = mongoose.model("Department", departmentSchema);
