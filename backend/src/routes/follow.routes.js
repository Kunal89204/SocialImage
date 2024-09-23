const express = require("express")
const router = express.Router()

const {follow, followInfo, followers, followersCount, getFollowStatus, acceptRequest} = require("../controllers/follow.controllers")

router.post('/follow/:id', follow)
router.get('/followers/:id', followers)
router.get('/followerscount/:id', followersCount)
router.get('/followinfo', followInfo)
router.put('/acceptrequest', acceptRequest)
router.post('/getFollowStatus/:userId', getFollowStatus)

module.exports = router;