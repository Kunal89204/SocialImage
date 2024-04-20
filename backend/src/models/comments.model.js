const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
    },

    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("comments", commentsSchema);
