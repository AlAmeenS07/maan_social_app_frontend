import axiosInstance from "../../config/axios"

const baseUrl = import.meta.env.VITE_USER_SERVICE_BASE_URL

export const adminUsersApi = async(params : any) => {
    const res = await axiosInstance.get(baseUrl + "/admin/users", params)
    return res.data
}