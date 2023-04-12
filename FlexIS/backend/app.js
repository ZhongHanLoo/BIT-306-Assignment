const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const employeeController = require("./controllers/employeeController");
const departmentController = require("./controllers/departmentController");
const fwaRequestController = require("./controllers/fwaRequestController");
const dailyScheduleController = require("./controllers/dailyScheduleController");


const app = express();

app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://zhonghanloo:FlexIS@cluster0.c0vnr6t.mongodb.net/FlexIS?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch(() => {
    console.log("connection failed");
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});

app.post("/api/employee", employeeController.addEmployee);
app.get("/api/employee", employeeController.getAllEmployee);
app.get("/api/employee/:id", employeeController.getEmployee);
app.delete("/api/employee/:id", employeeController.deleteEmployee);
app.put("/api/employee/", employeeController.updateEmployee);
app.get("/api/getSupervisorByDepartment/:id", employeeController.getSupervisorByDepartment);
app.post("/api/login/", employeeController.login);
app.get("/api/getEmployeeById/:id", employeeController.getEmployeeById);

app.post("/api/department", departmentController.addDepartment);
app.get("/api/department", departmentController.getAllDepartment);
app.get("/api/department/:id", departmentController.getDepartment);
app.delete("/api/department/:id", departmentController.deleteDepartment);
app.put("/api/department", departmentController.updateDepartment);

app.post("/api/fwaRequest", fwaRequestController.addFwaRequest);
app.get("/api/fwaRequest", fwaRequestController.getAllFwaRequest);
app.get("/api/fwaRequest/:id", fwaRequestController.getFwaRequest);
app.delete("/api/fwaRequest/:id", fwaRequestController.deleteFwaRequest);
app.put("/api/fwaRequest", fwaRequestController.updateFwaRequest);
app.get("/api/getFwaRequestByEmployee/:id", fwaRequestController.getFwaRequestByEmployee);
// app.get("/api/getNewestFwaRequest", fwaRequestController.getNewestFwaRequest);
app.get("/api/getPendingFwaRequestForSupervisor/:id", fwaRequestController.getPendingFwaRequestForSupervisor);
app.get("/api/getAcceptedFwaRequestForSupervisor/:id", fwaRequestController.getAcceptedFwaRequestForSupervisor);
app.get("/api/getRejectedFwaRequestForSupervisor/:id", fwaRequestController.getRejectedFwaRequestForSupervisor);
app.get("/api/getDepartmentFlexiHours/:id", fwaRequestController.getDepartmentFlexiHours);
app.get("/api/getDepartmentWorkFromHome/:id", fwaRequestController.getDepartmentWorkFromHome);
app.get("/api/getDepartmentHybrid/:id", fwaRequestController.getDepartmentHybrid);
app.get("/api/getDepartmentRequest/:id", fwaRequestController.getDepartmentRequest);


app.post("/api/dailySchedule", dailyScheduleController.addDailySchedule);
app.get("/api/dailySchedule", dailyScheduleController.getAllDailySchedule);
app.get("/api/dailySchedule/:id", dailyScheduleController.getDailySchedule);
app.delete("/api/dailySchedule/:id", dailyScheduleController.deleteDailySchedule);
app.put("/api/dailySchedule", dailyScheduleController.updateDailySchedule);

module.exports = app;
