const cloudinary = require("cloudinary").v2
const fs = require("fs")

cloudinary.config({
    cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return null;
        }

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        fs.unlinkSync(localFilePath)

        console.log("File Uploaded Successfully", response.url)
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)
    }
}


const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
    try {
      const response = await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
      console.log("File deleted successfully", response);
      return response;
    } catch (error) {
      console.error("Error deleting file from Cloudinary:", error);
      throw error;
    }
  };
  

module.exports = {uploadOnCloudinary, deleteFromCloudinary}