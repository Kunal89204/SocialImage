const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

const requireAuth = async (req, res, next) => {

    // verify authentication
    const {authorization} = req.headers

    if (!authorization) {
        return res.json({error: 'Auth token required'})
    }

    const token = authorization.split(' ')[1]

    try {
        const {_id} = jwt.verify(token, process.env.jwt_secret)
        req.user = await User.findOne({_id}).select('_id')
        next()
    } catch (error) {
        console.log({error: "req not authorized"})
        res.status(401).json({message:"req not authorized"})
    }


}

module.exports = requireAuth;