const mongoose = require("mongoose");

const dailyScheduleSchema = mongoose.Schema({
  scheduleId: { type: Number, required: true },
  date: { type: Date, required: true },
  workLocation: { type: String, required: true },
  workHours: { type: String, required: true },
  workReport: { type: String, required: true },
  supervisorComment: { type: String, required: true },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
});

module.exports = mongoose.model("DailySchedule", dailyScheduleSchema);
