const Saved = require("../models/saved.model");

const savePost = async (req, res) => {
    try {
        const { userId, postId } = req.body;

        // Check if a saved document for the user already exists
        let savedDoc = await Saved.findOne({ userId });

        if (savedDoc) {
            // If the document exists, check if the post is already saved
            const postIndex = savedDoc.savedPosts.indexOf(postId);

            if (postIndex > -1) {
                // Post exists, so remove it
                savedDoc.savedPosts.splice(postIndex, 1); // Remove postId from the array
                await savedDoc.save();
                res.status(200).json({ message: 'Post removed successfully' });
            } else {
                // Post does not exist, so add it
                savedDoc.savedPosts.push(postId); // Add postId to the array
                await savedDoc.save();
                res.status(200).json({ message: 'Post saved successfully' });
            }
        } else {
            // No saved document for the user, create a new one
            const newSavedDoc = new Saved({
                userId,
                savedPosts: [postId]
            });
            await newSavedDoc.save();
            res.status(200).json({ message: 'Post saved successfully' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred' });
    }
};


const getUserSavedPost = async (req, res) => {
    try {
        const {userId}  = req.params;
        const savedPosts = await Saved.findOne({userId})
        res.json(savedPosts)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    savePost,
    getUserSavedPost
}