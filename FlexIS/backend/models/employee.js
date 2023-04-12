const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  employeeId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  position: { type: String, required: true },
  email: { type: String, required: true },
  fwaStatus: { type: String, required: true },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  userType: { type: String, required: true },
  supervisingEmployee: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  ],
  fwaRequestList: [{ type: mongoose.Schema.Types.ObjectId, ref: "FwaRequest" }],
  dailyScheduleList: [
    { type: mongoose.Schema.Types.ObjectId, ref: "DailySchedule" },
  ],
});

module.exports = mongoose.model("Employee", employeeSchema);
