const { uploadOnCloudinary, deleteFromCloudinary } = require('../middlewares/cloudinary');
const User = require('../models/user.model')


const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        console.log(error);
    }
};

const registerUser = async (req, res) => {
    try {
        const { username, password, fullName } = req.body;

        if (!username || !password) {
            return res.json({ message: "Fields can't be empty" });
        }

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.json({ message: "Account already exists" });
        }

        const newUser = await User.create({
            fullName,
            username,
            password,
        });

        // Generate access and refresh tokens
        const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(newUser._id)
        // Save refresh token to user document
        newUser.refreshToken = refreshToken;
        await newUser.save();

        // Set refresh token as a cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            secure: true,
            sameSite: 'strict',
        });

        // Convert user document to plain JavaScript object and delete the password key
        const userObject = newUser.toObject();
        delete userObject.password;

        // Send access token and user object in response
        res.json({ accessToken, user: userObject });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.json({ message: "Fields can't be empty" });
      }
  
      const existingUser = await User.findOne({ username });
  
      if (!existingUser) {
        return res.json({ message: "User doesn't exist" });
      }
  
      const isPasswordValid = await existingUser.isPasswordCorrect(password);
      if (!isPasswordValid) {
        return res.json({ message: 'Invalid username or password' });
      }
  
      // Generate access and refresh tokens
      const accessToken = existingUser.generateAccessToken();
      const refreshToken = existingUser.generateRefreshToken();
  
      // Save refresh token to user document (if needed)
      existingUser.refreshToken = refreshToken;
      await existingUser.save();
  
      // Set refresh token as a cookie
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        secure: true,
        sameSite: 'strict',
      });
  
      // Convert user document to plain JavaScript object and delete the password key
      const userObject = existingUser.toObject();
      delete userObject.password;
  
      // Send access token and user object in response
      res.json({ accessToken, user: userObject });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
const getUsers = async (req, res) => {
    try {
        const data = await User.find()
        res.json(data)
    } catch (error) {
        console.log(object)
    }
}

const validate_token = async (req, res) => {
    try {
        res.status(200).json({ valid: true })
    } catch (error) {
        console.log(error)
    }
}

const refreshAccessToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token is required' });
    }

    try {
        // Verify refresh token
        const decoded = User.verifyRefreshToken(refreshToken);
        if (!decoded) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        // Fetch user by _id
        const user = await User.findById(decoded._id);

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        // Generate new access token
        const accessToken = user.generateAccessToken();

        // Send new access token in response
        res.json({ accessToken });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const userInfo = async (req, res) => {
    try {
        const username = req.params.username;
        const data = await User.findOne({ username });
        res.json(data);
    } catch (error) {
        console.log(error)
    }
}

const userInfoId = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findById(id);
        res.json(data);
    } catch (error) {
        console.log(error)
    }
}

const editProfile = async (req, res) => {
    try {
        const userId = req.params.id;

        // Extract fields from the request body
        const { fullname, bio, location, website, facebook, twitter, linkedin, instagram, github } = req.body;

        // Prepare an object with only the provided fields
        const updatedData = {
            ...(fullname && { fullName: fullname }),
            ...(bio && { bio }),
            ...(location && { location }),
            ...(website && { website }),
            ...(facebook && { "socialMedia.facebook": facebook }),
            ...(twitter && { "socialMedia.twitter": twitter }),
            ...(linkedin && { "socialMedia.linkedIn": linkedin }),
            ...(instagram && { "socialMedia.instagram": instagram }),
            ...(github && { "socialMedia.github": github })
        };

        // Retrieve the current user data to check for existing images
        const currentUser = await User.findById(userId);
        if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const getPublicIdFromUrl = (url) => {
            const parts = url.split('/');
            const fileName = parts[parts.length - 1];
            const publicId = fileName.split('.')[0];
            return publicId;
          };
        // Handle file uploads if files are present in the request
        if (req.files && req.files["file1"]) {
            // Delete existing profile image from Cloudinary if it exists
            if (currentUser.profileImg) {
                await deleteFromCloudinary(getPublicIdFromUrl(currentUser.profileImg));
            }
            // Upload the new profile image and add URL to updatedData
            const profileImg = await uploadOnCloudinary(req.files["file1"][0].path);
            updatedData.profileImg = profileImg.url;
        }

        if (req.files && req.files["file2"]) {
            // Delete existing banner image from Cloudinary if it exists
            if (currentUser.bannerImg) {
                await deleteFromCloudinary(getPublicIdFromUrl(currentUser.bannerImg));
            }
            // Upload the new banner image and add URL to updatedData
            const bannerImg = await uploadOnCloudinary(req.files["file2"][0].path);
            updatedData.bannerImg = bannerImg.url;
        }

        // Find the user by ID and update the data, returning the updated document
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("User data updated:", updatedUser);

        res.status(200).json({ message: "Profile updated successfully", updatedUser });

    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Failed to update profile" });
    }
};

const getSuggestedUsers = async (req, res) => {
    try {
      const { userId } = req.query;
      
      // Fetch the current user
      const currentUser = await User.findById(userId);
      if (!currentUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const { location, age } = currentUser;
      
      // Define scoring parameters
      const minAge = age - 5; // Suggest users within a 5-year range
      const maxAge = age + 5;
  
      // Find users who are not already followed or the current user
      let users = await User.find({ _id: { $ne: userId } });
  
      // Calculate scores for each user
      const scoredUsers = users.map(user => {
        let score = 0;
  
        // Location Match
        if (user.location === location) {
          score += 20; // Score for location match
        }
  
        // Age Range
        if (user.age >= minAge && user.age <= maxAge) {
          score += 15; // Score for age range match
        }
  
        // Bio Similarity (Basic example)
        const bioMatch = user.bio && currentUser.bio && user.bio.includes(currentUser.bio);
        if (bioMatch) {
          score += 10; // Score for bio similarity
        }
  
        // Full Name Similarity (Basic example)
        const nameMatch = user.fullName && currentUser.fullName && user.fullName.includes(currentUser.fullName);
        if (nameMatch) {
          score += 10; // Score for name similarity
        }
  
        return { user, score };
      });
  
      // Sort users by score
      scoredUsers.sort((a, b) => b.score - a.score);
  
      // Take the top suggestions
      const topSuggestions = scoredUsers.slice(0, 10).map(item => item.user);
  
      // Include some random suggestions if needed
      // (Uncomment if you want to add random users)
      // const randomUsers = await User.aggregate([{ $match: { _id: { $ne: userId } } }, { $sample: { size: 5 } }]);
      // topSuggestions = [...topSuggestions, ...randomUsers].slice(0, 10);
  
      res.json(topSuggestions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };




module.exports = {
    registerUser,
    loginUser,
    getUsers,
    validate_token,
    refreshAccessToken,
    userInfo,
    userInfoId,
    editProfile
}

