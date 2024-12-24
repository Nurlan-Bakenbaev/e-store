import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `https://e-store2024.onrender.com/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
export default axiosInstance;
