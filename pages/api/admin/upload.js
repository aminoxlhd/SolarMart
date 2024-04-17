import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";

dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage });
const myUploadMiddleware = upload.array("file");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await runMiddleware(req, res, myUploadMiddleware);

  let uploadedImageUrls = [];

  for (const file of req.files) {
    try {
      const b64 = Buffer.from(file.buffer).toString("base64");
      let dataURI = "data:" + file.mimetype + ";base64," + b64;
      const response = await cloudinary.uploader.upload(dataURI, {
        folder: "dropzone-images",
      });

      uploadedImageUrls.push(response.secure_url); 
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(400).json({ error: "Error uploading image" });
      return;
    }
  }
  res.status(200).json({ message: "Upload successful", imageUrls: uploadedImageUrls });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
