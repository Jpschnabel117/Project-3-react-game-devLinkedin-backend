const express = require("express");

const {
  getUserIdController,
  getUsersController,
  updateUserController,
  deleteUserController,

  getUpvotedListController,
  addToUpvotedController,
  deleteFromUpvotedController,

  getUserFavorites,
  addToUserFavorites,
  deleteFromUserFavorites,

  getUserSavedJobs,
  addToUserSavedJobs,
  deleteFromUserSavedJobs,
} = require("../controllers/user.controllers");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const router = express.Router();

router.get("/user/:userId", getUserIdController);
router.get("/users", getUsersController);
router.get("/user//upvotedlist", isAuthenticated, getUpvotedListController);
router.get("/user//favoriteslist", isAuthenticated, getUserFavorites);
router.get("/user//savedjobs", isAuthenticated, getUserSavedJobs);

router.put("/user", isAuthenticated, updateUserController);

router.put(
  "/user/addupvoted/:projectId",
  isAuthenticated,
  addToUpvotedController
);
router.post(
  "/user/addfavoriteproject/:projectId",
  isAuthenticated,
  addToUserFavorites
);
router.post("/user/addsavedjob", isAuthenticated, addToUserSavedJobs);
// add dms in the future

router.delete(
  "/user/deleteupvoted/:projectId",
  isAuthenticated,
  deleteFromUpvotedController
);
router.delete(
  "/user/deletefavoritedproject/:projectId",
  isAuthenticated,
  deleteFromUserFavorites
);
router.delete(
  "/user/:userId/deletesavedjob/:jobId",
  isAuthenticated,
  deleteFromUserSavedJobs
);
router.delete("/user/:userId", isAuthenticated, deleteUserController);

module.exports = router;
