import axiosInstance from "../../config/axios";
import type { LoginFormData } from "../../pages/admin/AdminLogin";
import { apis } from "../../utils/constants";

const baseUrl = import.meta.env.VITE_USER_SERVICE_BASE_URL

export const adminLoginApi = async(data : LoginFormData) => {
    const res = await axiosInstance.post(baseUrl + apis.ADMIN_AUTH_LOGIN , data)
    return res.data
}

export const adminLogoutApi = async() => {
    const res = await axiosInstance.post(baseUrl + apis.ADMIN_AUTH_LOGOUT)
    return res.data
}