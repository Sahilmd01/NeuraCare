import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = () => {
  const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_SECRET_KEY } = process.env;

  if (!CLOUDINARY_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_SECRET_KEY) {
    console.error("❌ Missing Cloudinary configuration in environment variables.");
    process.exit(1); // or throw an error if you want to handle it elsewhere
  }

  cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_SECRET_KEY,
  });

  console.log("✅ Cloudinary configured successfully");
};

export default connectCloudinary;
