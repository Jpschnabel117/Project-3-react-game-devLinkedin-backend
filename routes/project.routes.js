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
  postProjectComment
} = require("../controllers/project.controllers");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.post("/projects", isAuthenticated, createProjectController);
router.post("/projects/:projectId/comment", isAuthenticated, postProjectComment);

router.get("/projects", getProjectController);
router.get("/projects/:projectId", getProjectIdController);

router.put("/projects/:projectId", isAuthenticated, putProjectController);
router.put("/projects/:projectId/upvote", isAuthenticated, putUpdateUpvotes);
router.put("/projects/:projectId/hiring", isAuthenticated, putUpdateHiring);

router.delete("/projects/:projectId", isAuthenticated, deleteProjectController);

module.exports = router;
