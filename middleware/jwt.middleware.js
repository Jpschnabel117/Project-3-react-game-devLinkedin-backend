const { expressjwt: jwt } = require("express-jwt");
const Comment = require("../models/comment.model");
const Project = require("../models/project.model");
const User = require("../models/user.model");

const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload",
  getToken: getTokenFromHeaders,
});

function getTokenFromHeaders(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    const token = req.headers.authorization.split(" ")[1];
    return token;
  }
  return null;
}


const isProjectOwner = (req, res, next) => {
  Project.findById(req.params.projectId)
    .then((foundProject) => {
      if ((String(foundProject.owner) === req.payload._id) || req.payload.isadmin) {
        console.log(req.payload.isadmin)
        next();
      } else {
        //pop up model
        console.log("oh no")
        res.send("not project owner or admin")
      }
    })
    .catch((err) => {
      console.log(req.payload._id)
      console.log(err);
    });
};


const isCommentOwner = (req, res, next) => {
  Comment.findById(req.params.commentId)
    .then((foundComment) => {
      if ((String(foundComment.owner) === req.payload._id) || req.payload.isadmin) {
        console.log(foundComment)
        next();
      } else {
        //pop up model
        console.log("not comment owner or admin");
        res.send("not comment owner or admin")
      }
    })
    .catch((err) => {
      console.log(err);
    });
};



module.exports = {
  isAuthenticated,
  isProjectOwner,
  isCommentOwner
};
