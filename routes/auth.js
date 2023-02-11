const express = require("express");
const User = require("../models/User");
const fetchUser = require("../middleware/fetchUser")
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = require('../config/keys');

//Route 1: create a user using: post /api/auth/createUser . No login require
router.post(
  "/createUser",
  [
    body("name", "Enter a valid name")
      .not()
      .isEmpty()
      .trim()
      .isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    // password must be at least 5 chars long
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    let success = false;
    //if there are error then, return Bad request and the errors msg
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    // check whether the user with this email exist already
    try {
      let user = await User.findOne({ email: req.body.email });
      //     console.log(user);
      if (user) {
        return res
          .status(400)
          .json({success, error: "sorry a user with this email already exists " });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //  create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      // client or server ka sath secure communication karna ka ley JWT npm package use ki ha
      const Data = {
        user: { id: user.id },
      };
      const authtoken = jwt.sign(Data, JWT_SECRET);
      console.log(authtoken);
      res.json({success:true, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("internal server error");
    }
  }
);

//Route 2:  Authenticate a user using : post /api/auth/login/ No login require
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot blank").exists(),
  ],
  async (req, res) => {
    console.log(req.body);
    let success = false;
    const errors = validationResult(req);
    //if there are error then, return Bad request and the errors msg
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({success, error: "please try to login with corrct credential" });
      }
      let passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({success, error: "please try to login with corrct credential" });
      }
      const Data = {
        user: { id: user.id },
      };
      const authtoken = jwt.sign(Data, JWT_SECRET);
      // console.log(authtoken);
      res.json({success:true, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("internal server error");
    }
  }
);

//Route 3:  Get loggedin user details using : post /api/auth/getuser -> login require
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    let userId =  req.user.id;
    let user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error");
  }
});

module.exports = router;
