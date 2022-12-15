const express = require("express");

const {
  signupController,
  loginController,
} = require("../controllers/auth.controllers");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/verify", isAuthenticated, (req, res, next) => {
  //this could be a controller
  console.log(req.payload);
  res.status(200).json(req.payload);
});

module.exports = router;
