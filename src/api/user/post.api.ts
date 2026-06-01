import axiosInstance from "../../config/axios"
import type { PostUploadData } from "../../types/user/user.post"
import { apis } from "../../utils/constants"


const basePostUrl = import.meta.env.VITE_POST_SERVICE_BASE_URL

export const fetchUserPostsApi = async() => {
    const res = await axiosInstance.get(basePostUrl + apis.USER_POST)
    return res.data
}

export const createPostApi = async(data : PostUploadData) =>  {
    const res = await axiosInstance.post(basePostUrl + apis.USER_POST , data)
    return res.data
}


export const updatePostApi = async(postId : string, data : PostUploadData) =>  {
    const res = await axiosInstance.put(basePostUrl + apis.USER_POST + `/${postId}` , data)
    return res.data
}


export const deletePostApi = async(postId : string) => {
    const res = await axiosInstance.patch(basePostUrl + apis.USER_POST + `/${postId}`)
    return res.data
}
