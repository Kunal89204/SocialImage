const multer = require("multer")
const path = require("path")
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const filename = `${uuidv4()}${ext}`;
      cb(null, filename);
    },
  });
  
  const upload = multer({ storage: storage });
  

  module.exports = upload;