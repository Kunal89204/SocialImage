const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },

        title: {
            type: String,
            required: true
        },

        imgUrl: {
            type: String,
        },

        videoUrl: {
            type: String
        },

        description: {
            type: String,
        },

        isPublic: {
            type: Boolean,
            default: true

        },
    },

    { timestamps: true }
);

module.exports = mongoose.model("posts", postSchema);     
