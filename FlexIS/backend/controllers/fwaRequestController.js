const FwaRequest = require("../models/fwaRequest");
const Employee = require("../models/employee");

exports.addFwaRequest = (req, res, next) => {
  const fwaRequest = new FwaRequest({
    requestId: req.body.requestId,
    requestDate: req.body.requestDate,
    workType: req.body.workType,
    description: req.body.description,
    reason: req.body.reason,
    status: req.body.status,
    comment: req.body.comment,
    employee: req.body.employee,
  });
  fwaRequest.save().then((createdFwaRequest) => {
    res.status(201).json({
      message: "FWA request added successfully",
      fwaRequest: createdFwaRequest,
    });
  });
};

exports.getAllFwaRequest = (req, res, next) => {
  FwaRequest.find().then((documents) => {
    res.status(200).json({
      message: "FWA request fetched successfully",
      fwaRequest: documents,
    });
  });
};

exports.getFwaRequest = (req, res, next) => {
  FwaRequest.findById(req.params.id).then((fwaRequest) => {
    res.status(200).json({
      message: "FWA request fetched successfully",
      fwaRequest: fwaRequest,
    });
  });
};

exports.deleteFwaRequest = (req, res, next) => {
  FwaRequest.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({
      message: "FWA request deleted!",
    });
  });
};

exports.updateFwaRequest = (req, res, next) => {
  const fwaRequest = {
    requestId: req.body.requestId,
    requestDate: req.body.requestDate,
    workType: req.body.workType,
    description: req.body.description,
    reason: req.body.reason,
    status: req.body.status,
    comment: req.body.comment,
    employee: req.body.employee,
  };

  FwaRequest.updateOne({ _id: req.body._id }, fwaRequest).then((result) => {
    console.log(result);
    res.status(200).json({ message: "FWA request update successfully" });
  });
};

exports.getFwaRequestByEmployee = (req, res, next) => {
  FwaRequest.find({ employee: req.params.id })
    .populate("employee")
    .then((documents) => {
      res.status(200).json({
        test: req.params.id,
        message: "FWA requests fetched successfully",
        fwaRequests: documents,
      });
    });
};

// exports.getNewestFwaRequest = (req, res, next) => {
//   FwaRequest.find().sort({$natural:-1}).limit(1).then((documents) => {
//     res.status(200).json({
//       message: "FWA request fetched successfully",
//       fwaRequest: documents,
//     });
//   });
// };

exports.getPendingFwaRequestForSupervisor = (req, res, next) => {
  Employee.find({
    _id: req.params.id,
  })
    .populate({
      path: "supervisingEmployee",
      populate: {
        path: "fwaRequestList",
        populate: {
          path: "employee",
        },
      },
    })
    .then((documents) => {
      const fwaRequests = [];
      documents.forEach((employee) => {
        employee.supervisingEmployee.forEach((supervisor) => {
          supervisor.fwaRequestList.forEach((request) => {
            if (request.status == "pending") {
              fwaRequests.push(request);
            }
          });
        });
      });
      res.status(200).json({
        message: "Pending FWA requests fetched successfully",
        fwaRequests: fwaRequests,
      });
    });
};

exports.getAcceptedFwaRequestForSupervisor = (req, res, next) => {
  Employee.find({
    _id: req.params.id,
  })
    .populate({
      path: "supervisingEmployee",
      populate: {
        path: "fwaRequestList",
        populate: {
          path: "employee",
        },
      },
    })
    .then((documents) => {
      const fwaRequests = [];
      documents.forEach((employee) => {
        employee.supervisingEmployee.forEach((supervisor) => {
          supervisor.fwaRequestList.forEach((request) => {
            if (request.status == "accepted") {
              fwaRequests.push(request);
            }
          });
        });
      });
      res.status(200).json({
        message: "Accepted FWA requests fetched successfully",
        fwaRequests: fwaRequests,
      });
    });
};

exports.getRejectedFwaRequestForSupervisor = (req, res, next) => {
  Employee.find({
    _id: req.params.id,
  })
    .populate({
      path: "supervisingEmployee",
      populate: {
        path: "fwaRequestList",
        populate: {
          path: "employee",
        },
      },
    })
    .then((documents) => {
      const fwaRequests = [];
      documents.forEach((employee) => {
        employee.supervisingEmployee.forEach((supervisor) => {
          supervisor.fwaRequestList.forEach((request) => {
            if (request.status == "rejected") {
              fwaRequests.push(request);
            }
          });
        });
      });
      res.status(200).json({
        message: "Rejected FWA requests fetched successfully",
        fwaRequests: fwaRequests,
      });
    });
};

exports.getDepartmentFlexiHours = (req, res, next) => {
  Employee.find({
    department: req.params.id,
  })
    .populate("fwaRequestList")
    .then((documents) => {
      const fwaRequests = [];
      documents.forEach((employee) => {
        employee.fwaRequestList.forEach((request) => {
          if (request.workType == "flexi-hour") {
            fwaRequests.push(request);
          }
        });
      });
      res.status(200).json({
        message: "Flexi Hours FWA requests fetched successfully",
        fwaRequests: fwaRequests,
      });
    });
};

exports.getDepartmentWorkFromHome = (req, res, next) => {
  Employee.find({
    department: req.params.id,
  })
    .populate("fwaRequestList")
    .then((documents) => {
      const fwaRequests = [];
      documents.forEach((employee) => {
        employee.fwaRequestList.forEach((request) => {
          if (request.workType == "work-from-home") {
            fwaRequests.push(request);
          }
        });
      });
      res.status(200).json({
        message: "Work From Home FWA requests fetched successfully",
        fwaRequests: fwaRequests,
      });
    });
};

exports.getDepartmentHybrid = (req, res, next) => {
  Employee.find({
    department: req.params.id,
  })
    .populate("fwaRequestList")
    .then((documents) => {
      const fwaRequests = [];
      documents.forEach((employee) => {
        employee.fwaRequestList.forEach((request) => {
          if (request.workType == "hybrid") {
            fwaRequests.push(request);
          }
        });
      });
      res.status(200).json({
        message: "Hybrid FWA requests fetched successfully",
        fwaRequests: fwaRequests,
      });
    });
};

exports.getDepartmentRequest = (req, res, next) => {
  Employee.find({
    department: req.params.id,
  })
    .populate({
      path: "fwaRequestList",
      populate: {
        path: "employee",
      },
    })
    .then((documents) => {
      const fwaRequests = [];
      documents.forEach((employee) => {
        employee.fwaRequestList.forEach((request) => {
          fwaRequests.push(request);
        });
      });
      res.status(200).json({
        message: "Department FWA requests fetched successfully",
        fwaRequests: fwaRequests,
      });
    });
};
