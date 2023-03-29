const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//const Post = require("./models/post");
//const employee = require("./models/employee");
const employeeController = require("./controllers/employeeController");
const departmentController = require("./controllers/departmentController");

const app = express();

app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://han:test@cluster0.6d8jju7.mongodb.net/node-angular?retryWrites=true&w=majority"
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
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/employee", employeeController.addEmployee);
app.get("/api/employee", employeeController.getAllEmployee);
app.get("/api/employee/:id", employeeController.getEmployee);
app.delete("/api/employee/:id", employeeController.deleteEmployee);
app.put("/api/employee/:id", employeeController.updateEmployee);

app.post("/api/department", departmentController.addDepartment);
app.get("/api/department", departmentController.getAllDepartment);
app.get("/api/department/:id", departmentController.getDepartment);
app.delete("/api/department/:id", departmentController.deleteDepartment);
app.put("/api/department/:id", departmentController.updateDepartment);

// app.post("/api/post", (req, res, next) => {
//   const post = new Post({
//     title: req.body.title,
//     content: req.body.content,
//   });

//   console.log(post);
//   res.status(201).json({
//     message: "Post added successfully",
//   });
// });
// const app = express();
// app.use((req,res,next)=>{
//   console.log('first middleware');
//   next();
// })

// app.use((req,res,next)=>{
//   res.send("hello");

// })

// app.post("/api/posts", (req, res, next) => {
//   const post = new Post({
//     title: req.body.title,
//     content: req.body.content,
//   });
//   post.save().then((createdPost) => {
//     res.status(201).json({
//       message: "Post added successfully-",
//       postId: createdPost.id,
//     });
//   });
// });

// app.get("/api/posts", (req, res, next) => {
//   Post.find().then((documents) => {
//     res.status(200).json({
//       message: "Post fetched successfully",
//       posts: documents,
//     });
//   });
// });

// app.delete("/api/posts/:id", (req, res, next) => {
//   Post.deleteOne({ _id: req.params.id }).then((result) => {
//     console.log(result);
//     res.status(200).json({
//       message: "Post deleted!",
//     });
//   });
// });

// app.put("/api/posts/:id", (req, res, next) => {
//   const post = new Post({
//     _id: req.body.id,
//     title: req.body.title,
//     content: req.body.content,
//   });

//   Post.updateOne({ _id: req.params.id }, post).then((result) => {
//     console.log(result);
//     res.status(200).json({ message: " update successful" });
//   });
// });

module.exports = app;
