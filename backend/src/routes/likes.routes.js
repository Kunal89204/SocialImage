const express = require("express")
const router = express.Router()

const {getUserLikes, like, getLikesByPost, getLikesForAPost} = require('../controllers/likes.controllers')

router.post('/toggleLike/:id', like)
router.get('/getUserLikes/:id', getUserLikes)
router.get('/getLikesByPost', getLikesByPost)
router.get('/getLikesForAPost/:postId', getLikesForAPost)

module.exports = router;