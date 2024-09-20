const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: String,

    profileImg: {
        type: String,
    },
    bannerImg: {
        type: String,
    },

    age: {
        type: Number,
    },

    fullName: {
        type: String,
    },
    bio: {
        type: String,
    },
    location: {
        type: String,
    },
    website: {
        type: String,
    },
    socialMedia: {
        facebook: String,
        twitter: String,
        linkedIn: String,
        instagram: String,
        github: String
    },
}, { timestamps: true })



// hashing the password before saving
userSchema.pre("save", async function (next) {
    const user = this;

    try {
        if (!user.isModified("password")) {
            return next();
        }

        user.password = await bcrypt.hash(user.password, 10);
        next();
    } catch (error) {
        console.log(error);
    }
});

// comparing the password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Generate access token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '2h', // Access token expires in 2 hours
        }
    );
}; 

// Generate refresh token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '24h', // Refresh token expires in 24 hours
        }
    );
};


module.exports = mongoose.model("users", userSchema)
