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
    comments: [], //placeholder until i make comment model
    upvotes: Number, //placeholder until i make a upvote model
    favoriteProjects: [{ type: Schema.Types.ObjectId, ref: "Project" }], //placeholder until i make a favorites model
    savedJobs: [{ type: Schema.Types.ObjectId, ref: "Job" }],
    lookingForJob: Boolean,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
