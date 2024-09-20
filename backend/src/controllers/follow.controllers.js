const Follow = require('../models/follow.model')
const User = require('../models/user.model')
const mongoose = require("mongoose")

const follow = async (req, res) => {
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
}

const followersCount = async (req, res) => {
    try {
        const userId = req.params.id;

        const followersCount = await Follow.countDocuments({ user: userId });
        const followingCount = await Follow.countDocuments({ follower: userId });


        res.status(200).json({ followersCount, followingCount });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const followers = async (req, res) => {
    try {
        const userId = req.params.id;
        const followers = await Follow.find({ user: userId }).populate('follower', '-password');
        res.json(followers.map(follower => follower))
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getFollowStatus = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.params.userId); // Current user ID
        const personId = new mongoose.Types.ObjectId(req.body.personId); // Person being checked

        // Aggregation pipeline
        const [followStatus] = await Follow.aggregate([
            {
                $match: {
                    follower: userId, user: personId,
                }
            },
            {
                $addFields: {
                    status: {
                        $cond: {
                            if: { $and: [{ $eq: ['$follower', userId] }, { $eq: ['$isAccepted', true] }] },
                            then: 'Following',
                            else: {
                                $cond: {
                                    if: { $and: [{ $eq: ['$user', userId] }, { $eq: ['$isAccepted', false] }] },
                                    then: 'Follow',
                                    else: 'Requested'
                                }
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,  // Exclude the default _id field
                    status: 1 // Include only the computed status
                }
            }
        ]);

        // If there's no follow record, default to 'follow'
        const response = followStatus || { status: 'Follow' };

        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const followInfo = async (req, res) => {
    try {
        // Query the Follow model and populate the 'follower' and 'user' fields
        const data = await Follow.find().populate('follower', '-password').populate('user', '-password');
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    follow,
    followersCount,
    followers,
    followInfo,
    getFollowStatus
}