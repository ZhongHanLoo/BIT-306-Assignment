const mongoose = require ('mongoose');

const dailyScheduleSchema = mongoose.Schema({
  Id: {type: String, required: true},
  date: {type: Date, required: true},
  workLocation: {type: String, required: true},
  workHours: {type: String, required: true},
  workReport: {type: String, required: true},
  supervisorComment: {type: String, required: true},
});

module.exports = mongoose.model('DailySchedule', dailyScheduleSchema);
