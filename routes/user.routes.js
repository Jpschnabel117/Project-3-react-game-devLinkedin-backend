const express = require("express");

const {
  getUserIdController,
  getUsersController,
  updateUserController,
  deleteUserController,
  updateUserUpvotedController,
  updateUserCommentsController,
  updateUserFavorites,
  updateUserJobs,
} = require("../controllers/user.controllers");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const router = express.Router();


router.get("/user/:userId", getUserIdController);
router.get("/users", getUsersController);

router.put("/user", isAuthenticated, updateUserController);
router.put("/user/upvoted", isAuthenticated,updateUserUpvotedController);
router.put("/user/comments",isAuthenticated, updateUserCommentsController);
router.put("/user/favorites",isAuthenticated, updateUserFavorites);
router.put("/user/jobs", isAuthenticated,updateUserJobs);
// add dms in the future

router.delete("/user/:userId", isAuthenticated, deleteUserController)

module.exports = router;
