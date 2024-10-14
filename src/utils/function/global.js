import { STORAGE_BUCKET } from "../../config/config-variable";

export const convertImageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const generateImageUrl = (fileName) => {
  return `https://storage.googleapis.com/${STORAGE_BUCKET}/${fileName}`;
};
