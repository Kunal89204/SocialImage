const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


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
    },
  });
  
  userSchema.pre("save", async function (next) {
    try {
      const user = this;
      if (!user.isModified("password")) {
        return next();
      }
  
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  });
  
  userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };
  
  module.exports = mongoose.model("User", userSchema);