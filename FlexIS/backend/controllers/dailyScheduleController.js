const DailySchedule = require("../models/dailySchedule");

exports.addDailySchedule = (req, res, next) => {
  const dailySchedule = new DailySchedule({
    scheduleId: req.body.scheduleId,
    date: req.body.date,
    workLocation: req.body.workLocation,
    workHours: req.body.workHours,
    workReport: req.body.workReport,
    supervisorComment: req.body.supervisorComment,
    employee: req.body.employee,
  });
  dailySchedule.save().then((createdDailySchedule) => {
    res.status(201).json({
      message: "Daily Schedule added successfully",
      dailySchedule: createdDailySchedule,
    });
  });
};

exports.getAllDailySchedule = (req, res, next) => {
  DailySchedule.find().then((documents) => {
    res.status(200).json({
      message: "Daily Schedules fetched successfully",
      dailySchedules: documents,
    });
  });
};

exports.getDailySchedule = (req, res, next) => {
  DailySchedule.findById(req.params.id).then((dailySchedule) => {
    res.status(200).json({
      message: "Daily Schedule fetched successfully",
      dailySchedule: dailySchedule,
    });
  });
};

exports.deleteDailySchedule = (req, res, next) => {
  DailySchedule.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({
      message: "Daily Schedule deleted!",
    });
  });
};

exports.updateDailySchedule = (req, res, next) => {
  const dailySchedule = {
    scheduleId: req.body.scheduleId,
    date: req.body.date,
    workLocation: req.body.workLocation,
    workHours: req.body.workHours,
    workReport: req.body.workReport,
    supervisorComment: req.body.supervisorComment,
    employee: req.body.employee,
  };

  DailySchedule.updateOne({ _id: req.body._id }, dailySchedule).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Daily Schedule update successfully" });
  });
};
