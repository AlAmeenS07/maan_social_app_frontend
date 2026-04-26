import axios from "axios";
import { store } from "../store/store";
import { setUser } from "../store/slices/user.slice";
import { refreshTokenApi } from "./auth.api";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // change to your backend
  withCredentials: true,
});


axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().user.accessToken

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    console.log("refresh eror" , error)

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {

        const res : any = await refreshTokenApi()

        if(res.success){
          store.dispatch(setUser(res.data))
        }

        const newAccessToken = res.data.accessToken

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        return Promise.reject(err)
      }
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;