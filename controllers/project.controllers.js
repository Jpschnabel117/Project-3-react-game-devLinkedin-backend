const Comment = require("../models/comment.model");
const Job = require("../models/job.model");
const Project = require("../models/project.model");
const User = require("../models/user.model");

const createProjectController = (req, res, next) => {
  Project.create({
    title: req.body.title,
    description: {
      short: req.body.description.short,
      long: req.body.description.long,
    },
    tech: {
      engines: req.body.tech.engines,
      languages: req.body.tech.languages,
    },
    owner: req.payload._id,
    links: {
      github: req.body.links.github,
      steam: req.body.links.steam,
      patreon: req.body.links.patreon,
      discord: req.body.links.discord,
    },
    upvotes: 0,
    hiring: req.body.hiring,
    deleted: false,
  })
    .then((createdProject) => {
      res.send(createdProject);
    })
    .catch((err) => res.send(err));
}; // working

const getProjectController = (req, res, next) => {
  Project.find()
    //.populate("owner")
    .then((foundProjectsArray) => {
      res.send(foundProjectsArray);
    })
    .catch((err) => res.send(err));
}; // working

const getProjectIdController = (req, res, next) => {
  Project.findById(req.params.projectId)
    .then((foundProject) => {
      res.send(foundProject);
    })
    .catch((err) => res.send(err));
}; // working

const putProjectController = (req, res, next) => {
  //update this for new model
  let currentDate = new Date();
  let timeStamp = currentDate.getTime();
  Project.findOneAndUpdate(
    { _id: req.params.projectId },
    {
      title: req.body.title,
      description: {
        short: req.body.description.short,
        long: req.body.description.long,
      },
      tech: {
        engines: req.body.tech.engines,
        languages: req.body.tech.languages,
      },
      links: {
        github: req.body.links.github,
        steam: req.body.links.steam,
        patreon: req.body.links.patreon,
        discord: req.body.links.discord,
      },
      updated: timeStamp,
      //comments: req.body.comments, // seperate controller route
      //jobs seperate controller
    },
    { new: true }
  )
    .then((updatedProject) => {
      console.log(updatedProject);
      res.send(updatedProject);
    })
    .catch((err) => res.send(err));
}; // working

const putUpdateUpvotes = (req, res, next) => {
  Project.findOneAndUpdate(
    { _id: req.params.projectId },
    {
      upvotes: req.body.upvotes, //maybe add here
    },
    { new: true }
  )
    .then((updatedProject) => {
      console.log(updatedProject);
      res.send(updatedProject);
    })
    .catch((err) => res.send(err));
}; // needs front end checks

const putUpdateHiring = (req, res, next) => {
  let currentDate = new Date();
  let timeStamp = currentDate.getTime();
  Project.findOneAndUpdate(
    { _id: req.params.projectId },
    {
      hiring: req.body.hiring,
      updated: timeStamp,
    },
    { new: true }
  )
    .then((updatedProject) => {
      console.log(updatedProject);
      res.send(updatedProject);
    })
    .catch((err) => res.send(err));
}; // working

const deleteProjectController = (req, res, next) => {
  Project.findOneAndDelete({
    _id: req.params.projectId,
  })
    .then(() => {
      return Comment.deleteMany({ project: req.params.projectId });
    })
    .then(() => {
      console.log("comments deleted");
      return Job.deleteMany({ project: req.params.projectId });
    })
    .then(() => {
      console.log("jobs deleted");
      res.send("deleted Project");
    })
    .catch((err) => res.send(err));
}; // working

const postProjectComment = (req, res, next) => {
  Comment.create({
    owner: req.payload._id,
    comment: req.body.comment,
    project: req.params.projectId,
  })
    // .then((newComment) => {
    //   tempcomment = newComment;
    //   return User.findOneAndUpdate(
    //     { _id: req.payload._id },
    //     { $addToSet: { comments: newComment._id } },
    //     { new: true }
    //   );
    // })
    .then((newComment) => {
      return Project.findOneAndUpdate(
        {
          _id: req.params.projectId,
        },
        { $addToSet: { comments: newComment._id } },
        { new: true }
      );
    })
    .then((updatedProject) => {
      res.send(updatedProject);
    })
    .catch((err) => console.log(err));
}; // working

const updateComment = (req, res, next) => {
  Comment.findOneAndUpdate(
    { _id: req.params.commentId },
    {
      comment: req.body.comment,
    },
    { new: true }
  )
    .then((updatedComment) => {
      console.log(updatedComment);
      res.send(updatedComment);
    })
    .catch((err) => res.send(err));
}; // working

const deleteComment = (req, res, next) => {
  Comment.findOneAndDelete({
    _id: req.params.commentId,
  })
    .then((deletedComment) => {
      Project.findOneAndUpdate(
        { _id: req.params.projectId },
        {
          $pull: { comments: deletedComment._id },
        },
        { new: true }
      )
        .then((updatedProject) => {
          console.log(updatedProject);
          res.send(updatedProject);
        })
        .catch((err) => res.send(err));
    })
    .catch((err) => res.send(err));
}; // working

module.exports = {
  createProjectController,
  getProjectController,
  getProjectIdController,
  putProjectController,
  deleteProjectController,
  putUpdateUpvotes,
  putUpdateHiring,
  postProjectComment,
  updateComment,
  deleteComment,
};
