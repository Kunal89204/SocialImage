const User = require("../models/user.model")

const getUserData = async (req, res) => {
    try {
        const username = req.params.username;
        const data = await User.findOne({ username });
        res.json(data);
      } catch (error) {
        console.log(error);
      }
}

export {getUserData}