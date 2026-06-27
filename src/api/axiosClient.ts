import axios from "axios";
import { API_BASE_URL } from "./apiConfig";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
});

// Attach JWT token automatically
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.data instanceof FormData) {
    // Force axios to set multipart with correct boundary
    config.headers["Content-Type"] = undefined;
  } else {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

export default axiosClient;