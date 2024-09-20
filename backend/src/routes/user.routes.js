const express = require('express')
const router = express.Router()
const requireAuth = require("../middlewares/requireAuth")
const upload = require('../middlewares/multer')

const { registerUser, loginUser, getUsers, validate_token, refreshAccessToken, userInfo, userInfoId, editProfile } = require('../controllers/user.controllers')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/getUsers', getUsers)
router.get('/validate-token', requireAuth, validate_token)
router.post('/refresh-token', refreshAccessToken);
router.get('/userinfo/:username', userInfo)
router.get('/userinfoid/:id', userInfoId)
router.put('/editProfile/:id', upload.fields([{ name: "file1" }, { name: "file2" }]), editProfile)


module.exports = router;