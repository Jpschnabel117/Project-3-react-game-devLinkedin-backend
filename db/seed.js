// require("dotenv").config();

// const mongoose = require("mongoose");

// const Project = require("../models/project.model");
// const Job = require("../models/job.model");

// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then((x) => {
//     console.log("connected to database:", x.connections[0].name);
//     return Project.create({
//       title: "Test Project",
//       description: "should be working",
//       tasks: [],
//     });
//   })
//   .then((createdProject) => {
//     console.log("my created project is:", createdProject);
//     return Task.create({
//       title: "Test Task",
//       description: "this should be working",
//       project: createdProject._id,
//     });
//   })
//   .then((createdTask) => {
//     console.log("my created task is:", createdTask);
//     return Project.findByIdAndUpdate(
//       createdTask.project,
//       {
//         $push: {
//           tasks: createdTask._id,
//         },
//       },
//       { new: true }
//     );
//   })
//   .then((updatedProject) => {
//     console.log("my updated project is", updatedProject);
//   })
//   .catch((err) => console.log(err));
