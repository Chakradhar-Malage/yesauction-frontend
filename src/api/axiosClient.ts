// import axios from "axios";

// const axiosClient = axios.create({
//   baseURL: "http://localhost:8081/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// axiosClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });


// export const fetchAuctions = async () => {
//     const response = await axiosClient.get("/auctions");
//     return response.data;
// }

// export default axiosClient;


import axios from "axios";
import { API_BASE_URL } from "./apiConfig";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token automatically
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosClient;