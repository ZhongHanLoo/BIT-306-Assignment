const Employee = require("../models/employee");


// module.exports = {
//   addEmployee,
//   getAllEmployee,
//   getEmployee,
//   deleteEmployee,
//   updateEmployee,
// };

exports.addEmployee = (req, res, next) => {
  const employee = new Employee({
    employeeId: req.body.employeeId,
    password: req.body.password,
    name: req.body.name,
    position: req.body.position,
    email: req.body.email,
    fwaStatus: req.body.fwaStatus,
    department: req.body.department.departmentId,
  });
  employee.save().then((createdEmployee) => {
    res.status(201).json({
      message: "Employee added successfully",
      employeeId: createdEmployee.id,
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
  const employee = new Employee({
    employeeId: req.body.employeeId,
    password: req.body.password,
    name: req.body.name,
    position: req.body.position,
    email: req.body.email,
    fwaStatus: req.body.fwaStatus,
  });

  Employee.updateOne({ _id: req.params.id }, employee).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Employee update successfully" });
  });
};
