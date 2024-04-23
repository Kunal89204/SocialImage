const express = require("express");
const router = express.Router();
const post = require("../models/posts.model");

const upload = require("../middlewares/multer");
const userModel = require("../models/user.model");

// get all posts with user details populated
router.get("/posts", async (req, res) => {
  try {
    const allPosts = await post.find().populate('userId', '-password'); // Populate the userId field with user details
    res.json(allPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// getting posts with username
router.get("/posts/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const data = await userModel.findOne({username})
    
    const userid = data._id;
    
    
    const userPosts = await post.find({
      userId: userid
    })
    res.json(userPosts)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// delete a post
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await post.findByIdAndDelete(id)
    res.json(data)
  } catch (error) {
    console.log(error)
  }
})





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
