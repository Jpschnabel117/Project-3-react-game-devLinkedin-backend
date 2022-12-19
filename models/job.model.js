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
    project: { type: Schema.Types.ObjectId, ref: "Project" },
    savedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }], // list of users who have saved the job
    updated: Date,
    deleted: Boolean,
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
