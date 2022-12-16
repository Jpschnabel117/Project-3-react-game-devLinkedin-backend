const express = require("express");

const {
    getUserIdController,
    getUsersController,
     updateUserController,
  //deleteUserController,
} = require("../controllers/user.controllers");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const router = express.Router();

router.get("/user/:userId", getUserIdController);
router.get("/users", getUsersController);
router.put("/user", isAuthenticated, updateUserController);
//router.delete("/user/:userId", isAuthenticated, deleteUserController)

module.exports = router;
