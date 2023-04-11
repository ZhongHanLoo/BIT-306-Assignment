const Department = require("../models/department");

module.exports.addDepartment = (req, res, next) => {
  const department = new Department({
    departmentId: req.body.departmentId,
    name: req.body.name,
  });
  department.save().then((createdDepartment) => {
    res.status(201).json({
      message: "Department added successfully-",
      department: createdDepartment,
    });
  });
};

exports.getAllDepartment = (req, res, next) => {
  Department.find().then((documents) => {
    res.status(200).json({
      message: "Departments fetched successfully",
      departments: documents,
    });
  });
};

exports.getDepartment = (req, res, next) => {
  Department.findById(req.params.id).then((department) => {
    res.status(200).json({
      message: "Department fetched successfully",
      department: department,
    });
  });
};

exports.deleteDepartment = (req, res, next) => {
  Department.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({
      message: "Department deleted!",
    });
  });
};

exports.updateDepartment = (req, res, next) => {
  const department = new {
    departmentId: req.body.departmentId,
    name: req.body.name,
  };

  Department.updateOne({ _id: req.body._id }, department).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Department update successfully" });
  });
};
