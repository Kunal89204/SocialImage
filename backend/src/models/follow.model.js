const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
   follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
   },
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
   },
   isAccepted:{
    type:Boolean,
    default: false
   }
  },
  { timestamps: true }
);

module.exports = mongoose.model("follow", followSchema);
