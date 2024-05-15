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

module.exports = router;
