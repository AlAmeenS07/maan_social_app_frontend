import axiosInstance from "../../config/axios"
import { apis } from "../../utils/constants"

const baseUrl = import.meta.env.VITE_USER_SERVICE_BASE_URL

export const adminUsersApi = async<T>(params : T) => {
    const res = await axiosInstance.get(baseUrl + apis.ADMIN_USERS , {params})
    return res.data
}

export const adminUserStatusApi = async(id : string) => {
    const res = await axiosInstance.patch(baseUrl + apis.ADMIN_USERS + `/${id}`)
    return res.data
}

export const fetchUserApi = async(id: string) => {
    const res = await axiosInstance.get(baseUrl + apis.ADMIN_USERS + `/${id}`)
    return res.data
}