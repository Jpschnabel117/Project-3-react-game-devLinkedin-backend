const { expressjwt: jwt } = require("express-jwt");
const Project = require("../models/project.model");


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
        console.log(req.payload.isadmin)
        console.log("oh no")
        res.send("not owner or admin")
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

//maybe add middlewares for owner checks

module.exports = {
  isAuthenticated,
  isProjectOwner,
};
