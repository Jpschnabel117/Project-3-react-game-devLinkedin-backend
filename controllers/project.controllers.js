const Comment = require("../models/comment.model");
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
  })
    .then((createdProject) => {
      res.send(createdProject);
    })
    .catch((err) => res.send(err));
}; // working

const getProjectController = (req, res, next) => {
  Project.find()
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
    { _id: req.params.projectId, owner: req.payload._id },
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
      upvotes: req.body.upvotes,
    },
    { new: true }
  )
    .then((updatedProject) => {
      console.log(updatedProject);
      res.send(updatedProject);
    })
    .catch((err) => res.send(err));
}; // working

const putUpdateHiring = (req, res, next) => {
  Project.findOneAndUpdate(
    { _id: req.params.projectId, owner: req.payload._id },
    {
      hiring: req.body.hiring,
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
    owner: req.payload._id,
  })
    .then((deletedProject) => {
      if (deletedProject) {
        console.log("successfully deleted project", deletedProject);
      } else {
        res.send("unauthorized to delete this project");
      }
      console.log(deletedProject);
    })
    .catch((err) => res.send(err));
}; // working

let tempcomment;
const postProjectComment = (req, res, next) => {

  Comment.create({
    owner: req.payload._id,
    comment: req.body.comment,
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
          //owner: req.payload._id,
        },
        { $addToSet: { comments: newComment._id } },
        { new: true }
      );
    })
    .then(updatedProject => {
      res.send(updatedProject)
    })
    .catch((err) => console.log(err));
}; // kinda working

const updateComment = (req,res,next) => { } // TODO change contents, admin can do it too
const deleteComment = (req,res,next) => { } // TODO


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
  deleteComment
};
