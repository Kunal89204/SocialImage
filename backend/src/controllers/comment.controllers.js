const Comment  = require("../models/comment.model")
const Post = require("..//models/post.model");
const { default: mongoose } = require("mongoose");

const addComment = async (req, res) => {
    try {
        const {userId, postId, content} = req.body;

         // Basic validation
    if (!userId || !postId || !content) {
        return res.status(400).json({ error: 'All fields are required' });
      }

       // Ensure the post exists
    const postExists = await Post.findById(postId);
    if (!postExists) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const newComment = new Comment({
        userId,
        postId,
        content,
      });
  
      const savedComment = await newComment.save();

    res.json(savedComment)


    } catch (error) {
        console.log(error)
        return error
    }
}

const getCommentsForAPost = async (req, res) => {
    const {postId} = req.params

    if (!postId ) {
        return res.status(400).json({ error: 'PostId is required' });
      }

      const comments = await Comment.aggregate([
        {
            $match:{
                postId: new mongoose.Types.ObjectId(postId),
            }
        },
        {
            $lookup:{
                from:'users',
                localField:'userId',
                foreignField:'_id',
                as:'user'
            }
        },
        {
            $unwind:'$user'
        },
        {
            $project:{
                _id:1,
                content:1,
                createdAt:1,
                updatedAt:1,
                'user._id':1,
                'user.username':1,
                'user.profileImg':1,
            }
        }
      ])

      res.json(comments)
}

const deleteComment = async (req, res) => {
    try {
        const {commentId} = req.params
        const deleteComment = await Comment.findByIdAndDelete(commentId)
        res.json(deleteComment)
    } catch (error) {
        console.log(error)
        return error;
    }
}


module.exports = {
    addComment,
    getCommentsForAPost,
    deleteComment
}