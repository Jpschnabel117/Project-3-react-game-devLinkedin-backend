const express = require("express");
const router = express.Router();
const {
  createProjectController,
  getProjectController,
  getProjectIdController,
  putProjectController,
  deleteProjectController,
  putUpdateUpvotes,
  putUpdateHiring,
  postProjectComment,
  updateComment,
  deleteComment
} = require("../controllers/project.controllers");
const { isAuthenticated, isProjectOwner,isCommentOwner } = require("../middleware/jwt.middleware");

router.post("/projects", isAuthenticated, createProjectController); //working
router.post("/projects/:projectId/comment", isAuthenticated, postProjectComment); //working

router.get("/projects", getProjectController); //working
router.get("/projects/:projectId", getProjectIdController); //working

router.put("/projects/:projectId", isAuthenticated, isProjectOwner, putProjectController); //working
router.put("/projects/:projectId/upvote", isAuthenticated, putUpdateUpvotes); //needs front end checks i think
router.put("/projects/:projectId/hiring", isAuthenticated, isProjectOwner, putUpdateHiring); //working
router.put("/projects/:projectId/comment/:commentId", isAuthenticated, isCommentOwner, updateComment); //working

router.delete("/projects/:projectId/comment/:commentId", isAuthenticated,isCommentOwner, deleteComment);//working
router.delete("/projects/:projectId", isAuthenticated, isProjectOwner, deleteProjectController);//working

module.exports = router;
