const Job = require("../models/job.model");
const Project = require("../models/project.model");
const User = require("../models/user.model");

const getUserIdController = (req, res, next) => {
  User.findById(req.params.userId)
    .then((foundUser) => {
      res.send(foundUser);
    })
    .catch((err) => res.send(err));
}; // working

const getUsersController = (req, res, next) => {
  User.find()
    .then((foundUsersArray) => {
      res.send(foundUsersArray);
    })
    .catch((err) => res.send(err));
}; // working

const updateUserController = (req, res, next) => {
  //double check
  User.findOneAndUpdate(
    { _id: req.payload._id },
    {
      email: req.body.email,
      displayName: req.body.displayName,
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
      lookingForJob: req.body.lookingForJob,
    },
    { new: true }
  )
    .then((updatedProject) => {
      res.send(updatedProject);
    })
    .catch((err) => res.send(err));
}; // working

const getUpvotedListController = (req, res, next) => {
  User.findOne({ _id: req.payload._id })
    .then((foundUser) => {
      res.send(foundUser.upvoted);
    })
    .catch((err) => res.send(err));
}; // working
const addToUpvotedController = (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.payload._id },
    {
      $addToSet: { upvoted: req.params.projectId }, //name of project, to not allow double votes, might need
    },
    { new: true }
  )
    .then((updatedUser) => {
      console.log(updatedUser.upvoted);
      res.send(updatedUser.upvoted);
    })
    .catch((err) => res.send(err));
}; // working
const deleteFromUpvotedController = (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.payload._id },
    {
      $pull: { upvoted: req.params.projectId },
    },
    { new: true }
  )
    .then((updatedUser) => {
      console.log(updatedUser.upvoted);
      res.send(updatedUser.upvoted);
    })
    .catch((err) => res.send(err));
}; // working

const getUserFavorites = (req, res, next) => {
  User.findOne({ _id: req.payload._id })
    .then((foundUser) => {
      res.send(foundUser.favoriteProjects);
    })
    .catch((err) => res.send(err));
}; // working
const addToUserFavorites = (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.payload._id },
    {
      $addToSet: { favoriteProjects: req.params.projectId },
    },
    { new: true }
  )
    .then((updatedUser) => {
      console.log(updatedUser.favoriteProjects);
      res.send(updatedUser.favoriteProjects);
    })
    .catch((err) => res.send(err));
}; // working
const deleteFromUserFavorites = (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.payload._id },
    {
      $pull: { favoriteProjects: req.params.projectId },
    },
    { new: true }
  )
    .then((updatedUser) => {
      console.log(updatedUser.favoriteProjects);
      res.send(updatedUser.favoriteProjects);
    })
    .catch((err) => res.send(err));
}; // working

const getUserSavedJobs = (req, res, next) => {}; // TODO
const addToUserSavedJobs = (req, res, next) => {}; // TODO
const deleteFromUserSavedJobs = (req, res, next) => {}; // TODO

const deleteUserController = (req, res, next) => {
  if (req.payload.isadmin || req.payload._id === req.params.userId) {
    User.findOneAndDelete({
      _id: req.payload._id,
    })
      .then(() => {
        return Comment.deleteMany({ owner: req.params.userId });
      })
      .then(() => {
        console.log("user comments deleted")
        return Project.deleteMany({ owner: req.params.userId });
      })
      .then(() => {
        console.log("user projects deleted")
        return Job.deleteMany({ owner: req.params.userId });
      })
      .then( () => {
        console.log("user jobs deleted")
        res.send("user deleted")
      })
      .catch((err) => res.send(err));
  }
}; // NOT CURRENTLY DELETING USERS COMMENTS AND PROJECTS

module.exports = {
  getUserIdController,
  getUsersController,
  updateUserController,
  deleteUserController,

  getUpvotedListController,
  addToUpvotedController,
  deleteFromUpvotedController,

  getUserFavorites,
  addToUserFavorites,
  deleteFromUserFavorites,

  getUserSavedJobs,
  addToUserSavedJobs,
  deleteFromUserSavedJobs,
};
