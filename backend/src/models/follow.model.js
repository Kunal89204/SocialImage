const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
   follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
   },
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
   }
  },
  { timestamps: true }
);

module.exports = mongoose.model("follow", followSchema);
