const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts"
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Comment", commentSchema)