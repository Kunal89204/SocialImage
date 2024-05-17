const express = require("express");
const router = express.Router();
const comments = require("../models/comments.model");

router.post("/comment/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { postId, commentContent } = req.body;

    const newComment = await comments.create({
      userId,
      postId,
      comment: commentContent,
    });

    res.json(newComment);
  } catch (error) {
    console.log("there was an error");
  }
});


router.get("/:postId", async (req, res) => {
    try {
        const postId = req.params.postId;

        // const postData = 
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
