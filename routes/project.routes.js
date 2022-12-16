const express = require("express");
const router = express.Router();
const {
  createProjectController,
  getProjectController,
  getProjectIdController,
 // putProjectController,
  deleteProjectController,
} = require("../controllers/project.controllers");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.post("/projects", isAuthenticated, createProjectController);
router.get("/projects", getProjectController);
router.get("/projects/:projectId", getProjectIdController);
//router.put("/projects/:projectId", isAuthenticated, putProjectController);
router.delete("/projects/:projectId", isAuthenticated, deleteProjectController);

module.exports = router;
