const mongoose = require("mongoose");

// Define the like schema
const likeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
);

// Index for efficient querying
likeSchema.index({ userId: 1, postId: 1 });


// Define a model for likes using the schema
const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
