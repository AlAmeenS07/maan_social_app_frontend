import axiosInstance from "../../config/axios";
import type { LoginFormData } from "../../pages/admin/AdminLogin";

const baseUrl = import.meta.env.VITE_USER_SERVICE_BASE_URL

export const adminLoginApi = async(data : LoginFormData) => {
    const res = await axiosInstance.post(baseUrl + "/admin/auth/login" , data)
    return res.data
}

export const adminLogoutApi = async() => {
    const res = await axiosInstance.post(baseUrl + "/admin/auth/logout")
    return res.data
}