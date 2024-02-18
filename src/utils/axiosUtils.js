import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://chat-app-ovn9.onrender.com",
  // baseURL: "http://localhost:4000",
});

export default axiosInstance;
