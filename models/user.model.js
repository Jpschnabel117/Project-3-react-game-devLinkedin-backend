const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    description: {
      short: String,
      long: String,
    },
    tech: {
      engines: {
        type: [String],
        enum: ["unreal", "unity", "godot", "game maker", "cryengine"],
      },
      languages: {
        type: [String],
        enum: [
          "c",
          "c++",
          "c#",
          "javascript",
          "java",
          "html5",
          "python",
          "unrealscript",
          "lua",
          "gml",
          "swift",
        ],
      },
    },
    links: {
      github: String, //regex all of these eventually, to make sure they go to the right website
      steam: String,
      patreon: String,
      discord: String,
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }], //placeholder until i make comment model, or controller route for updating it
    upvoted: [String], // array of project _id
    favoriteProjects: [{ type: Schema.Types.ObjectId, ref: "Project" }], //placeholder until i make a favorites model or controller route for updating it
    savedJobs: [{ type: Schema.Types.ObjectId, ref: "Job" }], //placeholder until i make a upvote model, or controller route for updating it
    lookingForJob: Boolean, //placeholder until i make a upvote model, or controller route for updating it
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
