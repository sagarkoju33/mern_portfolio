const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadFile = async(filePath) => {
 try {
       const result = await cloudinary.uploader.upload(filePath);
       console.log(result)
        return result;
    } catch (error) {
        console.log(error.message);
    }

}

module.exports = {
  uploadFile
};
