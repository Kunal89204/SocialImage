const express = require("express")
const router = express();
const LikesSchema = require("../models/likes.model")


router.post("/toggle/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const postId = req.body;
    } catch (error) {
        console.log(error)
    }
})