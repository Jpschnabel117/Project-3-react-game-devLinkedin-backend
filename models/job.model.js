const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema(
  {
    title: {
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
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    links: {
      github: String, //regex all of these eventually, to make sure they go to the right website
      steam: String,
      patreon: String,
      discord: String,
    }, //fill with, unity etc
    favorites: [{ type: Schema.Types.ObjectId, ref: "User" }], // list of users who have favorited the job
    updated: Date,
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Project", jobSchema);

module.exports = Job;
