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


router.post('/newPost', upload.fields([
  {
    name: 'post',
    maxCount: 10 // Maximum of 10 posts (images)
  }, 
  {
    name: 'video',
    maxCount: 5 // Maximum of 5 videos
  }
]), newPost);

router.get('/getallpost', getAllPost)

module.exports = router;