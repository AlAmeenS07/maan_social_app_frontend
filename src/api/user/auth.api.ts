import type { LoginFormData } from "../../pages/user/Login";
import type { RegisterFormData } from "../../pages/user/Register";
import axiosInstance from "../../config/axios";
import axios from "axios";
import { apis } from "../../utils/constants";


export const registerApi = async(data : RegisterFormData) => {
    const res = await axiosInstance.post(import.meta.env.VITE_USER_SERVICE_BASE_URL + apis.USER_AUTH_REGISTER , {
        name : data.fullname , email : data.email , dob : data.dob , gender : data.gender , password : data.password
    })
    return res.data
}

export const loginApi = async(data : LoginFormData) => {
    const res = await axiosInstance.post(import.meta.env.VITE_USER_SERVICE_BASE_URL + apis.USER_AUTH_LOGIN , data)
    return res.data
}

export const resendOtpApi = async(data : string) => {
    const res = await axiosInstance.post(import.meta.env.VITE_USER_SERVICE_BASE_URL + apis.USER_AUTH_RESEND_OTP , {email : data})
    return res.data
}

export const otpVerifyApi = async(data : {email : string , otp : string}) => {
    const res = await axiosInstance.post(import.meta.env.VITE_USER_SERVICE_BASE_URL + apis.USER_AUTH_VERIFY_OTP , data)
    return res.data
}

export const forgotPasswordApi = async(data : {email : string}) => {
    const res = await axiosInstance.post(import.meta.env.VITE_USER_SERVICE_BASE_URL + apis.USER_AUTH_FORGOT_PASSWORD_OTP , data)
    return res.data
}

export const forgotPasswordVerifyOtpApi = async(data : {email : string , otp : string}) => {
    const res = await axiosInstance.post(import.meta.env.VITE_USER_SERVICE_BASE_URL + apis.USER_AUTH_FORGOT_PASSWORD_VERIFY_OTP , data)
    return res.data
}

export const resetPasswordApi = async(data : {password : string}) => {
    const res = await axiosInstance.post(import.meta.env.VITE_USER_SERVICE_BASE_URL + apis.USER_AUTH_FORGOT_PASSWORD , data)
    return res.data
}

export const logoutApi = async() => {
    const res = await axiosInstance.post(import.meta.env.VITE_USER_SERVICE_BASE_URL + apis.USER_AUTH_LOGOUT)
    return res.data
}

export const refreshTokenApi = async() => {
    const res = await axios.get(import.meta.env.VITE_API_GATEWAY + import.meta.env.VITE_USER_SERVICE_BASE_URL + apis.USER_REFRESH_TOKEN , {withCredentials : true})
    return res.data
}

export const userDataApi = async() => {
    const res = await axiosInstance.get(import.meta.env.VITE_USER_SERVICE_BASE_URL + apis.USER_ME)
    return res.data
}