const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const upload = require("../middlewares/multer");
const jwt = require("jsonwebtoken")
/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const data = await User.find();
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

// Registering the User

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.json({ message: "Fields can't be empty" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.json({ message: "Account already exist" });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, "shhh", {
      expiresIn: "2h",
    });
    res.cookie("token", token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 }); // Set cookie with token

    res.json({ message: "User registered", userInfo: newUser });
  } catch (error) {
    console.log(error);
  }
});

// logging in the user
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.json({ message: "fields can't be empty" });
    }

    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      res.json({ message: "User does not exist" });
    }

    const isPasswordValid = await existingUser.comparePassword(password);
    if (!isPasswordValid) {
      return res.json({ message: "Password is incorrect" });
    }

    const token = jwt.sign({ userId: existingUser._id }, "shhh", {
      expiresIn: "2h",
    });
    res.cookie("token", token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 }); // Set cookie with token

    res.json({ message: "User authenticated", userInfo: existingUser });
  } catch (error) {
    console.log(error);
  }
});

// get particular user info
router.get("/userinfo/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const data = await User.findOne({ username });
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

// userprofile with id
router.get("/userinfoid/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findById(id);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
