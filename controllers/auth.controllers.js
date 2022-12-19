const bcryptjs = require("bcryptjs");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const signupController = (req, res, next) => {
  if (!req.body.email || !req.body.password || !req.body.displayName) {
    return res.status(400).json({
      error: {
        message: "Missing email,name, or password",
      },
    });
  }

  //optional guard statement to check pw length and difficulty

  bcryptjs
    .hash(req.body.password, 10)
    .then((hashedpassword) => {
      console.log("made it here");
      return User.create({
        email: req.body.email,
        password: hashedpassword,
        displayName: req.body.displayName,
      });
    })
    .then((createdUser) => {
      res.send(createdUser);
    })
    .catch((err) => res.send(err));
};

const loginController = (req, res, next) => {
  const { email, password } = req.body; //destructured to just use email instead of req.body.email
  if (!email || !password) {
    return res.json({
      error: {
        message: "missing email or password",
      },
    });
  }

  let myUser;
  User.findOne({ email: email }) // can also just use {email}, returns null if not found
    .then((foundUser) => {
      if (!foundUser) {
        return Promise.reject("invalid username or password");
      }
      myUser = foundUser;
      return bcryptjs.compare(password, foundUser.password);
    })
    .then((isValidPassword) => {
      if (!isValidPassword) {
        return Promise.reject("invalid username or password");
      }
      const payload = {
        _id: myUser._id,
        displayName: myUser.displayName,
        email: myUser.email,
        isadmin: myUser.isadmin
      };

      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "100h", //
      });

      res.json({
        authToken: authToken,
      });
    })
    .catch((err) => res.send(err));
};

module.exports = {
  signupController,
  loginController,
};




