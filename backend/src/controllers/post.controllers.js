const { uploadOnCloudinary, deleteFromCloudinary } = require('../middlewares/cloudinary')
const Post = require('../models/post.model')
const userModel = require('../models/user.model')
const Like = require('../models/likes.model')
const mongoose = require("mongoose")
const getSuggestedPosts = async (req, res) => {
    try {
        const { userId } = req.query;

        // Fetch the current user
        const currentUser = await userModel.findById(userId);
        if (!currentUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch friends and followers (assuming you have a Friends model or similar)
        const friends = await userModel.find({ _id: { $in: currentUser.friends } });
        const friendIds = friends.map(friend => friend._id);

        // Fetch posts by friends
        let posts = await Post.find({ userId: { $in: friendIds }, isPublic: true });

        // Fetch posts liked or commented by friends
        const likedPosts = await Like.find({ userId: { $in: friendIds } }).distinct('postId');
        const commentedPosts = await Comment.find({ userId: { $in: friendIds } }).distinct('postId');

        const likedOrCommentedPosts = [...new Set([...likedPosts, ...commentedPosts])];

        const postsLikedOrCommentedByFriends = await Post.find({ _id: { $in: likedOrCommentedPosts }, isPublic: true });

        // Fetch posts by mutual friends (assuming you have a mutualFriends function)
        const mutualFriendsPosts = await Post.find({ userId: { $in: mutualFriends(userId) }, isPublic: true });

        // Fetch popular posts (most liked or commented)
        const popularPosts = await Post.aggregate([
            { $lookup: { from: 'likes', localField: '_id', foreignField: 'postId', as: 'likes' } },
            { $lookup: { from: 'comments', localField: '_id', foreignField: 'postId', as: 'comments' } },
            { $addFields: { likeCount: { $size: '$likes' }, commentCount: { $size: '$comments' } } },
            { $sort: { likeCount: -1, commentCount: -1 } },
            { $limit: 10 } // Adjust limit as needed
        ]);

        // Combine all posts and sort them based on relevance
        let allPosts = [
            ...posts,
            ...postsLikedOrCommentedByFriends,
            ...mutualFriendsPosts,
            ...popularPosts
        ];

        // Remove duplicates
        allPosts = Array.from(new Set(allPosts.map(post => post._id))).map(id => {
            return allPosts.find(post => post._id.toString() === id.toString());
        });

        // Sort posts (Example: prioritize friend posts and popular posts)
        allPosts.sort((a, b) => {
            const scoreA = friendIds.includes(a.userId) ? 100 : 0;
            const scoreB = friendIds.includes(b.userId) ? 100 : 0;

            // Add more scoring criteria here
            return scoreB - scoreA;
        });

        // Return top suggestions
        res.json(allPosts.slice(0, 20)); // Adjust limit as needed
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Example mutualFriends function (simplistic approach)
const mutualFriends = async (userId) => {
    const user = await userModel.findById(userId).populate('friends');
    const friends = user.friends.map(friend => friend._id);

    const mutuals = await User.find({
        _id: { $in: friends },
        friends: { $in: [userId] }
    }).distinct('_id');

    return mutuals;
};


const getAllPosts = async (req, res) => {
    try {
        const allPosts = await Post.find().populate('userId', '-password')
        res.json(allPosts)
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const addPost = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { title, description } = req.body;
        let imgUrl = null;

        if (req.file) {
            const filename = req.file.path;
            const img = await uploadOnCloudinary(filename);
            imgUrl = img.url;
        }

        const newPost = await Post.create({
            userId,
            title,
            imgUrl,
            description,
        });

        if (!newPost) {
            return res.json({ message: "error uploading post" });
        }

        res.json({ message: "post created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};

const deletePost = async (req, res) => {
    try {
        const id = req.params.postId;
        const { imgurl } = req.body
        const data = await Post.findByIdAndDelete(id)

        // Function to extract the public ID from the Cloudinary URL
        const getPublicIdFromUrl = (url) => {
            const parts = url.split('/');
            const fileName = parts[parts.length - 1];
            const publicId = fileName.split('.')[0];
            return publicId;
        };



        const respo = await deleteFromCloudinary(getPublicIdFromUrl(imgurl))

        // res.json(data)
        console.log(respo, data)
    } catch (error) {
        console.log(error)
    }
}

const getUserPost = async (req, res) => {
    try {
        const username = req.params.username;
        const data = await userModel.findOne({ username })

        const userid = data._id;


        const userPosts = await Post.find({
            userId: userid
        })
        res.json(userPosts)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getPost = async (req, res) => {
    try {
        const postId = req.params.postId
       
        
        
        const postData = await Post.aggregate([
            {
                $match:{
                    _id: new mongoose.Types.ObjectId(postId)
                },
                
            },
            {
                $lookup:{
                    from:'users',
                    localField:'userId',
                    foreignField:'_id',
                    as:'userId'
                },
                
            },
            {
                $unwind:'$userId'
            },
            {
                $project:{
                    _id:1,
                    title:1,
                    imgUrl:1,
                    description:1,
                    isPublic:true,
                    createdAt:1,
                    updatedAt:1,
                    'userId._id':1,
                    'userId.username':1,
                    'userId.fullName':1,
                    'userId.profileImg':1,

                }
            }
        ])
        res.json(postData[0])

    } catch (error) {
        console.log(error)
    }
}

const editPost = async (req, res) => {
    try {
        const postId = req.params.postId
        const updatedData = await Post.findByIdAndUpdate(postId, req.body)
        res.json(updatedData)
    } catch (error) {
        console.log(error)
    }
}

const getAllPost = async (req, res) => {
    try {
  
        const allPosts = await Post.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userId'
                }
            },
            {
                $unwind: '$userId'
            },

            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'postId',
                    as: 'comments'
                }
            },

            {
                $addFields: {

                    commentsCount: {
                        $size: '$comments'
                    },

                }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    description: 1,
                    imgUrl: 1,
                    isPublic: 1,
                    videoUrl: 1,
                    updatedAt: 1,
                    createdAt: 1,
                    commentsCount: 1,
                    'userId.username': 1,
                    'userId.fullName': 1,
                    'userId.profileImg': 1,
                    'userId._id': 1,

                }
            },
            
        ]);


        res.json(allPosts)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllPosts,
    addPost,
    deletePost,
    getUserPost,
    getPost,
    editPost,
    getAllPost
}