import axiosInstance from "../../config/axios"
import { apis } from "../../utils/constants"

const basePostUrl = import.meta.env.VITE_POST_SERVICE_BASE_URL

export const adminUserPostsDataApi = async(id : string) => {
    const res = await axiosInstance.get(basePostUrl + apis.ADMIN_POST  + `/${id}`)
    return res.data
}

export const adminPostsApi = async<T>(params : T) => {
    const res = await axiosInstance.get(basePostUrl + apis.ADMIN_POST , {params})
    return res.data
}

export const adminListUnlistPostApi = async(id : string) =>  {
    const res = await axiosInstance.patch(basePostUrl + apis.ADMIN_POST + `/${id}`)
    return res.data
}