const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const Follow = require("../models/follow.model");

// router.post("/follow", async (req, res) => {
//   try {
//     const { userId, userToFollowId } = req.body;

//     // Check if the user already exists
//     const existingUser = await Follow.findOne({ userId });

//     if (existingUser) {
//       // If user exists, check if already following the target user
//       const alreadyFollowing = existingUser.following.includes(userToFollowId);
//       if (alreadyFollowing) {
//         return res
//           .status(400)
//           .json({ message: "You are already following this user." });
//       }

//       // Update the existing user document to add the new following user
//       await existingUser.updateOne({ $push: { following: userToFollowId } });
//       const followedUserExist = await Follow.findOne({
//         userId: userToFollowId,
//       });
//       if (followedUserExist) {
//         await followedUserExist.updateOne({ $push: { followers: userId } });
//       } else {
//         const newFollower = new Follow({
//           userId: userToFollowId,
//           followers: userId,
//         });

//         await newFollower.save();
//       }
//       res.status(200).json({ message: "User followed successfully." });
//     } else {
//       // Create a new follow relationship
//       const newFollow = new Follow({
//         userId,
//         following: [userToFollowId],
//       });

//       const followedUserExist = await Follow.findOne({
//         userId: userToFollowId,
//       });
//       if (followedUserExist) {
//         await followedUserExist.updateOne({ $push: { followers: userId } });
//       } else {
//         const newFollower = new Follow({
//           userId: userToFollowId,
//           followers: userId,
//         });

//         await newFollower.save();
//       }

//       // Save the new follow relationship to the database
//       await newFollow.save();
//       res.status(201).json({ message: "User followed successfully." });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error." });
//   }
// });


router.post("/follow/:id", async (req, res) => {
  try {
    const followerId = req.params.id;
    const { username } = req.body;

    // Find the user to follow by username
    const followingUser = await User.findOne({ username });

    if (!followingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userId = followingUser._id;

    // Check if the user is already being followed
    const existingFollow = await Follow.findOne({ follower: followerId, user: userId });

    if (existingFollow) {
      // If already following, unfollow
      await Follow.deleteOne({ _id: existingFollow._id });
      return res.status(200).json({ message: `Unfollowed user ${username}` });
    }

    // If not following, follow
    const follow = await Follow.create({ follower: followerId, user: userId });

    res.status(201).json({ message: `Started following user ${username}`, follow });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all followers for a user
router.get("/followers/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const followers = await Follow.find({ follower: userId }).populate('user', 'username');
    res.json(followers.map(follower => follower.user.username))
    // res.json(followers)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

router.get("/followerscount/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const followersCount = await Follow.countDocuments({ user: userId });
    const followingCount = await Follow.countDocuments({ follower: userId });


    res.status(200).json({ followersCount, followingCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/followinfo", async (req, res) => {
  try {
    // Query the Follow model and populate the 'follower' and 'user' fields
    const data = await Follow.find().populate('follower').populate('user');
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
