const Project = require("../models/project.model");

const createProjectController = (req, res, next) => {
  Project.create({
    title: req.body.title,
    description: {
      short: req.body.description.short, //might just be req.body.short    depending on front end input i think
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
    favorites: 0,
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
}; // update this

const deleteProjectController = (req, res, next) => {
  Project.findByIdAndDelete(req.params.projectId)
    .then(() => {
      res.send("successfully deleted");
    })
    .catch((err) => res.send(err));
}; // working

module.exports = {
  createProjectController,
  getProjectController,
  getProjectIdController,
  putProjectController,
  deleteProjectController,
};
