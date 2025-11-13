const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config(); // loads .env file
// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,       // ✅ correct key
  api_key: process.env.CLOUD_API_KEY,       // ✅ correct key
  api_secret: process.env.CLOUD_API_SECRET  // ✅ correct key
});

// Configure Cloudinary Storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Selecthome_Dev',
    allowed_formats: ['png', 'jpg', 'jpeg'], // ✅ correct spelling
  },
});

module.exports = { cloudinary, storage };
