const express = require('express')
const router = express.Router()
const requireAuth = require("../middlewares/requireAuth")
const upload = require("../middlewares/multer")

const { getAllPosts, addPost, deletePost, editPost, getPost, getUserPost, getAllPost, newPost } = require("../controllers/post.controllers")

router.get('/getallposts', requireAuth, getAllPosts)
router.get('/getPost/:postId', getPost)
router.get('/getUserPost/:username', requireAuth, getUserPost)
router.put('/editPost/:id', requireAuth, editPost)
router.delete('/deletePost/:postId', requireAuth, deletePost)
router.post('/addpost/:userId', upload.single("post"), addPost)

router.post('/newPost/:userId', upload.fields([{
    name: 'post',
    maxCount: 10
}, {
    name: 'video',
    maxCount: 10
}]), newPost)

router.get('/getallpost', getAllPost)

module.exports = router;