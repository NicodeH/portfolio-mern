// Import multer, used for handling file uploads
import multer from "multer";

// Import Cloudinary's v2 SDK for uploading files to their servers
import { v2 as cloudinary } from "cloudinary";

// Import a special storage engine that lets multer talk to Cloudinary
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Import dotenv to read environment variables from a .env file
import dotenv from "dotenv";

// Load environment variables into process.env
dotenv.config();

// 🔧 Configure Cloudinary using values from the .env file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Your Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY,       // Your Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET, // Your Cloudinary API secret
});

// 🎯 Set up the Cloudinary storage engine for multer
const storage = new CloudinaryStorage({
  cloudinary, // Pass in the cloudinary instance

  // Define how files will be stored in your Cloudinary account
  params: {
    folder: "portfolio",                  // Folder name in your Cloudinary dashboard
    allowed_formats: ["jpg", "jpeg", "png", "webp"], // Allowed image formats
    transformation: [{ width: 1200, crop: "limit" }], // Optional: resize images if too big
  },
});

// 🎒 Create the multer middleware using the Cloudinary storage config
const upload = multer({ storage });

// 🚀 Export the upload middleware so you can use it in your routes
export default upload;
