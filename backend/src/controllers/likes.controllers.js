const { default: mongoose } = require('mongoose');
const Likes = require('../models/likes.model')
const {Types:{ObjectId}} = mongoose

const like = async (req, res) => {
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
}


// getting all likes of a particular user
const getUserLikes = async (req, res) => {
    try {
        const userId = req.params.id;
        const allLikes = await Likes.find({userId})
        const likes = allLikes.map((like) => like.postId)
        res.json(likes)
    } catch (error) {
        console.log(error)
    }
}



const getLikesByPost = async (req, res) => {
    try {
      const result = await Likes.aggregate([
        {
          $group: {
            _id: "$postId",
            users: { $push: "$userId" }
          }
        },
        {
          $project: {
            _id: 0,
            postId: "$_id",
            users: 1
          }
        }
      ]);
  
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

//   const getLikesForAPost = async (req, res) => {
//     try {
//         const postId = req.params.postId
//         const likes = await Likes.find({postId})
//         res.json(likes.map((like) => like.userId))
//     } catch (error) {
//         console.log(error)
//     }
// }


const getLikesForAPost = async (req, res) => {
  try {
      const { postId } = req.params;

      // Validate postId (assuming it's an ObjectId in MongoDB)
      if (!postId.match(/^[0-9a-fA-F]{24}$/)) {
          return res.status(400).json({ error: 'Invalid post ID format' });
      }

      // Fetch likes with only the userId field
      const likes = await Likes.find({ postId }).select('userId -_id');

      // Respond with the list of userIds and the total count
      res.status(200).json({
          postId,
          likes: likes.map(like => like.userId),
          totalLikes: likes.length,
      });
  } catch (error) {
      console.error('Error fetching likes:', error);
      res.status(500).json({ error: 'Server error, please try again later' });
  }
};

  

module.exports = {
    like, 
    getUserLikes,
    getLikesByPost,
    getLikesForAPost
}