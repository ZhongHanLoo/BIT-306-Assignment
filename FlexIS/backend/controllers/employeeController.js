const Employee = require("../models/employee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.addEmployee = (req, res, next) => {
  // bcrypt.hash(req.body.password, 10).then(hash => {
  //   const employee = new Employee({
  //     employeeId: req.body.employeeId,
  //     password: hash,
  //     name: req.body.name,
  //     position: req.body.position,
  //     email: req.body.email,
  //     fwaStatus: req.body.fwaStatus,
  //     department: req.body.department,
  //     userType: req.body.userType,
  //     supervisingEmployee: req.body.supervisingEmployee,
  //     fwaRequestList: req.body.fwaRequestList,
  //     dailyScheduleList: req.body.dailyScheduleList,
  //   });
  //   employee.save().then((createdEmployee) => {
  //     res.status(201).json({
  //       message: "Employee added successfully",
  //       employee: createdEmployee,
  //     });
  //   });

  // })

  const employee = new Employee({
    employeeId: req.body.employeeId,
    password: req.body.password,
    name: req.body.name,
    position: req.body.position,
    email: req.body.email,
    fwaStatus: req.body.fwaStatus,
    department: req.body.department,
    userType: req.body.userType,
    supervisingEmployee: req.body.supervisingEmployee,
    fwaRequestList: req.body.fwaRequestList,
    dailyScheduleList: req.body.dailyScheduleList,
  });
  employee.save().then((createdEmployee) => {
    res.status(201).json({
      message: "Employee added successfully",
      employee: createdEmployee,
    });
  });
};

exports.getAllEmployee = (req, res, next) => {
  Employee.find()
    .populate("department")
    .then((documents) => {
      res.status(200).json({
        message: "Employees fetched successfully",
        employees: documents,
      });
    });
};

exports.getEmployee = (req, res, next) => {
  Employee.findById(req.params.id)
    .populate("department")
    .then((employee) => {
      res.status(200).json({
        message: "Employee fetched successfully",
        employee: employee,
      });
    });
};

exports.deleteEmployee = (req, res, next) => {
  Employee.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({
      message: "Employee deleted!",
    });
  });
};

exports.updateEmployee = (req, res, next) => {
  const employee = {
    employeeId: req.body.employeeId,
    password: req.body.password,
    name: req.body.name,
    position: req.body.position,
    email: req.body.email,
    fwaStatus: req.body.fwaStatus,
    department: req.body.department,
    userType: req.body.userType,
    supervisingEmployee: req.body.supervisingEmployee,
    fwaRequestList: req.body.fwaRequestList,
    dailyScheduleList: req.body.dailyScheduleList,
  };

  Employee.updateOne({ _id: req.body._id }, employee).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Employee update successfully" });
  });
};

exports.getSupervisorByDepartment = (req, res, next) => {
  Employee.find({ department: req.params.id, userType: "Supervisor" }).then(
    (documents) => {
      res.status(200).json({
        message: "Supervisors fetched successfully",
        employees: documents,
      });
    }
  );
};

exports.login = (req, res, next) => {
  // let fetchedUser;
  // Employee.findOne({employeeId: req.body.employeeId}).then((user)=>{
  //   if (!user) {
  //     return res.status(401).json({
  //       message: "Auth failed - user does not exist",
  //       employee: user,
  //     });
  //   }
  //   fetchedUser = user;
  //   return bcrypt.compare(req.body.password, user.password);
  // }).then((result)=>{
  //   if (!result) {
  //     return res.status(401).json({
  //       message: "Auth failed-- password didnt match",
  //       employee: fetchedUser,
  //     });
  //   }
  //   res.status(200).json({
  //     message: "User fetched successfully",
  //     employee: fetchedUser,
  //   });
  // }).catch((err) => {
  //   return res.status(401).json({
  //     message: "Auth failed",
  //     employee: fetchedUser,
  //   });
  // });

  Employee.findOne({
    employeeId: req.body.employeeId,
    password: req.body.password,
  }).then((user) => {
    res.status(200).json({
      message: "Employee fetched successfully",
      employee: user,
    });
  });
};

exports.getEmployeeById = (req, res, next) => {
  Employee.findOne({ employeeId: req.params.id }).then((document) => {
    res.status(200).json({
      message: "Employees fetched successfully",
      employee: document,
    });
  });
};
