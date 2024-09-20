const express = require("express")
const router = express.Router()
const {addComment, getCommentsForAPost, deleteComment} = require('../controllers/comment.controllers')


router.post('/addComment', addComment)
router.get('/getCommentsForAPost/:postId', getCommentsForAPost)
router.delete('/deleteComment/:commentId', deleteComment)

module.exports = router;