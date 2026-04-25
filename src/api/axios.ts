import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // change to your backend
  withCredentials: true,
});


export default axiosInstance;