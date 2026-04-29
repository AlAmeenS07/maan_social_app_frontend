import axiosInstance from "../../config/axios"

const baseUrl = import.meta.env.VITE_USER_SERVICE_BASE_URL

export const adminUsersApi = async<T>(params : T) => {
    const res = await axiosInstance.get(baseUrl + "/admin/users", {params})
    return res.data
}


export const adminUserStatusApi = async(id : string) => {
    const res = await axiosInstance.patch(baseUrl + `/admin/users/${id}`)
    return res.data
}