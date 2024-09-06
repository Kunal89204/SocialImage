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

// edit profile route
router.put(
  "/editprofile/:id",
  upload.fields([{ name: "file1" }, { name: "file2" }]),
  async (req, res) => {
    try {
      const file1 = req.files["file1"][0].filename;
      const file2 = req.files["file2"][0].filename;
      const userId = req.params.id;

      const { fullname, age, bio, location, website, facebook, twitter, linkedin, instagram } = req.body;

      const updatedData = {
        fullName: fullname,
        age,
        bio,
        location,
        website,
        "socialMedia.facebook": facebook,
        "socialMedia.twitter": twitter,
        "socialMedia.linkedIn": linkedin,
        "socialMedia.instagram": instagram,
        profileImg: file1,
        bannerImg: file2
      };

      // Find the user by ID and update the data, returning the updated document
      const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

      console.log("User data updated:", updatedUser);

      res.status(200).json({ message: "Profile updated successfully", updatedUser });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

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
