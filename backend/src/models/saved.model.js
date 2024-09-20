const mongoose = require("mongoose");

const savedSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Make sure this matches your user model name
        required: true
    },
    savedPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts' // Make sure this matches your post model name
    }]
}, { timestamps: true });

module.exports = mongoose.model("saved", savedSchema);
