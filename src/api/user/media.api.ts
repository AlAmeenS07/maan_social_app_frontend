import axiosInstance from "../../config/axios";
import { apis } from "../../utils/constants";

const mediaBaseUrl = import.meta.env.VITE_MEDIA_SERVICE_BASE_URL

export const uploadImageUrlApi = async (fileName: string,contentType: string) => {
    const res = await axiosInstance.post(mediaBaseUrl + apis.IMAGE_UPLOAD , { fileName, contentType })
    return res.data;
};


export const viewImageUrlApi = async (key: string) => {
    if(!key) return ""
    const response = await axiosInstance.get(mediaBaseUrl + apis.IMAGE_VIEW , {params: { key }});
    return response.data.data.url;
};