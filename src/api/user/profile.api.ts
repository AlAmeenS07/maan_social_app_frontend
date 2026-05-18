import axios from "axios"
import axiosInstance from "../../config/axios"
import { apis } from "../../utils/constants"
import type { EditProfileFormData } from "../../types/user/user.profile"
import type { SocialLinkType } from "../../compponents/SocialLinksModification"


const userBaseUrl = import.meta.env.VITE_USER_SERVICE_BASE_URL


export const fetchUserProfileApi = async() => {
    const res = await axiosInstance.get(userBaseUrl + apis.USER_PROFILE_FETCH)
    return res.data
}

export const fetchLocationApi = async(place : string) => {
    const res = await axios.get(`https://api.locationiq.com/v1/autocomplete?key=${import.meta.env.VITE_LOCATIONIQ_API_KEY}&q=${place}&tag=place:city&normalizecity=1&limit=5&format=json`)
    return res.data
}

export const checkUserNameApi = async(user_name : string) => {
    const res = await axiosInstance.post(userBaseUrl + apis.USER_NAME_CHECK , {user_name})
    return res.data
}


export const updateProfileApi = async(id : string, data : EditProfileFormData) => {
    if(!id) return
    const res = await axiosInstance.put(userBaseUrl + apis.USER_PROFILE + `/${id}` , data)
    return res.data
}


export const addProfileLinksApi = async(data : SocialLinkType[]) => {
    const res = await axiosInstance.post(userBaseUrl + apis.USER_PROFILE_LINK , {bioLinks : data})
    return res.data
}

export const editProfileLinksApi = async(data : SocialLinkType[]) => {
    const bioLinks = data.map(d => {
        return{
            linkId : d.id, 
            title : d.title, 
            url :d.url
        }
    })
    const res = await axiosInstance.put(userBaseUrl + apis.USER_PROFILE_LINK, {bioLinks})
    return res.data
}

export const deleteProfileLinkApi = async(linkId : string) => {
    const res = await axiosInstance.delete(userBaseUrl + apis.USER_PROFILE_LINK + `/${linkId}`)
    return res.data
}