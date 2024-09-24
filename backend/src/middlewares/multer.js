const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

// Define size limits (in bytes). Example: 5MB for images and 50MB for videos
const MAX_POST_SIZE = 5 * 1024 * 1024; // 5MB for post (image)
const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB for video

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${uuidv4()}${ext}`;
    cb(null, filename);
  }
});

// File filter to check the file size and type
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  
  // Check if the file is an image for 'post' or a video for 'video'
  if (file.fieldname === 'post' && (ext === '.jpg' || ext === '.jpeg' || ext === '.png')) {
    if (file.size > MAX_POST_SIZE) {
      cb(null, "file too lrge hai");
    }
    cb(null, true); // Accept the post (image)
  } else if (file.fieldname === 'video' && (ext === '.mp4' || ext === '.mov')) {
    if (file.size > MAX_VIDEO_SIZE) {
      return cb(new Error("Video file size should not exceed 50MB"));
    }
    cb(null, true); // Accept the video
  } else {
    cb(new Error("Invalid file type"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_VIDEO_SIZE // Apply the largest size limit globally (video size)
  }
});

module.exports = upload;
