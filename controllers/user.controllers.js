const User = require("../models/user.model");

const getUserIdController = (req, res, next) => {
  User.findById(req.params.userId)
    .then((foundUser) => {
      res.send(foundUser);
    })
    .catch((err) => res.send(err));
};

const getUsersController = (req, res, next) => {
  User.find()
    .then((foundUsersArray) => {
      res.send(foundUsersArray);
    })
    .catch((err) => res.send(err));
};

const updateUserController = (req, res, next) => { //double check
  User.findByIdAndUpdate(
    req.payload._id,
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
      comments: req.body.comments,
      upvotes: req.body.upvotes,
      favoriteProjects: req.body.favoriteProjects,
      savedJobs: req.body.savedJobs,
      lookingForJob: req.body.lookingForJob,
    },
    { new: true }
  )
    .then((updatedProject) => {
      res.send(updatedProject);
    })
    .catch((err) => res.send(err));
};

module.exports = {
  getUserIdController,
  getUsersController,
  updateUserController,
  //deleteUserController,
};
