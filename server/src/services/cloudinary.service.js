import cloudinary from "../settings/cloudinary.js";
import streamifier from "streamifier";

const uploadImage = (buffer, folder = "uploads") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export default uploadImage;
