import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://chat-app-ovn9.onrender.com",
});

export default axiosInstance;
