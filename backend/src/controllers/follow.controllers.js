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

        res.status(201).json({ message: `Request sent to ${username}`, follow });
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
        // const followers = await Follow.find({ user: userId }).populate('follower', '-password');
        const followers = await Follow.aggregate([
            {
                $match:{
                    "user": new mongoose.Types.ObjectId(userId),
                    "isAccepted": false
                }
            },
            {
                $lookup:{
                    from:'users',
                    localField:'follower',
                    foreignField:'_id',
                    as:'follower'
                }
            },
            {
                $unwind: '$follower'
            },
            {
                $project:{
                    '_id':1,
                    'follower._id':1,
                    'follower.username':1,
                    'follower.profileImg':1,
                    'follower.fullName':1,
                    'isAccepted':1
                }
            }
        ])
        res.json(followers)
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

const acceptRequest = async (req, res) => {
    try {
        const { acceptorId, requestorId } = req.body;

        // Update the `isAccepted` field to `true`
        const response = await Follow.findOneAndUpdate(
            {
                follower: new mongoose.Types.ObjectId(requestorId),
                user: new mongoose.Types.ObjectId(acceptorId)
            },
            {
                $set: { isAccepted: true } // Set isAccepted to true
            },
            {
                new: true // Return the updated document
            }
        );

        // If no document is found
        if (!response) {
            return res.status(404).json({
                status: "error",
                message: "Follow request not found"
            });
        }

        // Return the updated document in a standardized response
        return res.json({
            status: "success",
            message: "Follow request accepted",
            data: response
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "An error occurred while accepting the request",
            error: error.message
        });
    }
};


module.exports = {
    follow,
    followersCount,
    followers,
    followInfo,
    getFollowStatus,
    acceptRequest
}