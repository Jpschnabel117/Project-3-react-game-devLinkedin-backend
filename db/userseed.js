require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../models/user.model");

mongoose
  .connect(process.env.MONGODB_URI)
  .then((x) => {
    console.log("connected to database:", x.connections[0].name);
    return User.create({
      email: "jp@jp.com",
      password: "jp",
      displayName: "jp",
      description: {
        short: "this is a short description",
        long: "this is a long description",
      },
      tech: {
        engines: ["unreal"],
        languages: ["unrealscript", "c++"],
      },
      link: {
        github: "jpgit",
        patreon: "jppatreaon",
        discord: "jp#2123",
      },
      favoriteProjects: [],
      savedJobs: [],
    });
  })
  .then((createdUser) => {
    console.log("new user:", createdUser);
  })
  .catch((err) => console.log(err));
