const mongoose = require("mongoose");

const fwaRequestSchema = mongoose.Schema({
  requestId: { type: Number, required: true, unique: true },
  requestDate: { type: Date, required: true },
  workType: { type: String, required: true },
  description: { type: String, required: true },
  reason: { type: String, required: true },
  status: { type: String, required: true },
  comment: { type: String },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
});

module.exports = mongoose.model("FwaRequest", fwaRequestSchema);
