const express = require("express");
const router = express.Router();
const post = require("../models/posts.model");
const upload = require("../middlewares/multer");

// get all posts
router.get("/posts", async (req, res) => {
  try {
    const allPosts = await post.find();
    res.json(allPosts);
  } catch (error) {
    console.log(error);
  }
});

// get post for a particualr user
router.get("/posts/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const allPosts = await post.find({ userId });
    res.json(allPosts);
  } catch (error) {
    console.log(error);
  }
});

// upload posts
router.post("/:id", upload.single("post"), async (req, res) => {
  try {
    const userId = req.params.id;
    const filename = req.file.filename;
    const { description } = req.body;

    const newPost = await post.create({
      userId,
      imgUrl: filename,
      description,
    });

    if (!newPost) {
      res.json({ message: "error uploading post" });
    }

    res.json({ message: "post created succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
