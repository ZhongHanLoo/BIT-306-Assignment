const Employee = require("../models/employee");

exports.addEmployee = (req, res, next) => {
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
  Employee.find().populate('department').then((documents) => {
    res.status(200).json({
      message: "Employees fetched successfully",
      employees: documents,
    });
  });
};

exports.getEmployee = (req, res, next) => {
  Employee.findById(req.params.id).populate('department').then((employee) => {
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
  Employee.find({ department: req.params.id, userType: "Supervisor" }).then((documents) => {
    res.status(200).json({
      message: "Supervisors fetched successfully",
      employees: documents,
    });
  });
};

exports.login = (req, res, next) => {
  Employee.findOne({employeeId: req.body.employeeId, password: req.body.password}).then((user) => {
    res.status(200).json({
      message: "Employee fetched successfully",
      employee: user,
    });
  })
}
