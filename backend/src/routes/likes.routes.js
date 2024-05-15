const express = require("express");
const router = express.Router();
const Likes = require("../models/likes.model");

router.post("/toggle/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const { postId } = req.body;

        // Find the existing like document for the given user and post
        const existingLike = await Likes.findOne({ userId, postId });

        if (existingLike) {
            // If the like document exists, delete it (unlike)
            await Likes.deleteOne({ userId, postId });
            res.json({ message: "Post unliked successfully", createdAt: existingLike.createdAt });
        } else {
            // If the like document doesn't exist, create a new one (like)
            const newLike = await Likes.create({ userId, postId });
            res.json({ message: "Post liked successfully", createdAt: newLike.createdAt });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// getting all likes of a particular user
router.get('/likedby/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const allLikes = await Likes.find({userId})
        const likes = allLikes.map((like) => like.postId)
        res.json(likes)
    } catch (error) {
        console.log(error)
    }
})

// Route to get total number of likes for each post
router.get("/total-likes", async (req, res) => {
    try {
      // Aggregate likes collection to count the number of likes for each post
      const likesCount = await Likes.aggregate([
        {
          $group: {
            _id: "$postId",
            totalLikes: { $sum: 1 }
          }
        }
      ]);
  
      // Return the result
      res.json(likesCount);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  

module.exports = router;
