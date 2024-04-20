const mongoose = require("mongoose");

const likesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
    },

    isLiked: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("likes", likesSchema);
