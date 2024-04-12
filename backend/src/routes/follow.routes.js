const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const Follow = require("../models/follow.model");

router.post("/follow", async (req, res) => {
  try {
    const { userId, userToFollowId } = req.body;

    // Check if the user already exists
    const existingUser = await Follow.findOne({ userId });

    if (existingUser) {
      // If user exists, check if already following the target user
      const alreadyFollowing = existingUser.following.includes(userToFollowId);
      if (alreadyFollowing) {
        return res
          .status(400)
          .json({ message: "You are already following this user." });
      }

      // Update the existing user document to add the new following user
      await existingUser.updateOne({ $push: { following: userToFollowId } });
      const followedUserExist = await Follow.findOne({
        userId: userToFollowId,
      });
      if (followedUserExist) {
        await followedUserExist.updateOne({ $push: { followers: userId } });
      } else {
        const newFollower = new Follow({
          userId: userToFollowId,
          followers: userId,
        });

        await newFollower.save();
      }
      res.status(200).json({ message: "User followed successfully." });
    } else {
      // Create a new follow relationship
      const newFollow = new Follow({
        userId,
        following: [userToFollowId],
      });

      const followedUserExist = await Follow.findOne({
        userId: userToFollowId,
      });
      if (followedUserExist) {
        await followedUserExist.updateOne({ $push: { followers: userId } });
      } else {
        const newFollower = new Follow({
          userId: userToFollowId,
          followers: userId,
        });

        await newFollower.save();
      }

      // Save the new follow relationship to the database
      await newFollow.save();
      res.status(201).json({ message: "User followed successfully." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
