export const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
export const API_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_URL
    : import.meta.env.VITE_API_URL_LOCAL;

export const BASE_URL = "/";

export const CMU_OAUTH_URL = import.meta.env.VITE_CMU_OAUTH_URL;

export const STORAGE_BUCKET = import.meta.env.VITE_STORAGE_BUCKET;
