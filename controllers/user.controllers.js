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

const updateUserUpvotedController = (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.payload._id },
    {
      upvoted: req.body.upvoted,
    },
    { new: true }
  )
    .then((updatedProject) => {
      console.log(updatedProject);
      res.send(updatedProject);
    })
    .catch((err) => res.send(err));
}; // working

// const updateUserCommentsController = (req, res, next) => {
//   User.findOneAndUpdate(
//     { _id: req.payload._id },
//     {
//       comments: req.body.comments,
//     },
//     { new: true }
//   )
//     .then((updatedProject) => {
//       console.log(updatedProject);
//       res.send(updatedProject);
//     })
//     .catch((err) => res.send(err));
// }; 

const updateUserFavorites = (req, res, next) => {}; // TODO

const updateUserJobs = (req, res, next) => {}; // TODO

const deleteUserController = (req, res, next) => {}; // TODO

module.exports = {
  getUserIdController,
  getUsersController,
  updateUserController,
  deleteUserController,
  updateUserUpvotedController,
  updateUserFavorites,
  updateUserJobs,
};
