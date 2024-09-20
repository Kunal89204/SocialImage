const express = require("express")
const router = express.Router()

const {getUserSavedPost, savePost} = require("../controllers/saved.controller")

router.post('/savepost', savePost)
router.get('/getsavedpost/:userId', getUserSavedPost)

module.exports = router;