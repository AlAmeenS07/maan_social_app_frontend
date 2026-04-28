import type { LoginFormData } from "../../pages/user/Login";
import type { RegisterFormData } from "../../pages/user/Register";
import axiosInstance from "../../config/axios";
import axios from "axios";


export const registerApi = async(data : RegisterFormData) => {
    const res = await axiosInstance.post(import.meta.env.VITE_USER_SERVICE_BASE_URL + "/user/auth/register" , {
        name : data.fullname , email : data.email , dob : data.dob , gender : data.gender , password : data.password
    })
    return res.data
}

export const loginApi = async(data : LoginFormData) => {
    const res = await axiosInstance.post(import.meta.env.VITE_USER_SERVICE_BASE_URL + "/user/auth/login" , data)
    return res.data
}

export const resendOtpApi = async(data : string) => {
    const res = await axiosInstance.post(import.meta.env.VITE_USER_SERVICE_BASE_URL + "/user/auth/resend-otp" , {email : data})
    return res.data
}

export const otpVerifyApi = async(data : {email : string , otp : string}) => {
    const res = await axiosInstance.post(import.meta.env.VITE_USER_SERVICE_BASE_URL + "/user/auth/verify-otp" , data)
    return res.data
}

export const forgotPasswordApi = async(data : {email : string}) => {
    const res = await axiosInstance.post(import.meta.env.VITE_USER_SERVICE_BASE_URL + "/user/auth/forgot-password/otp" , data)
    return res.data
}

export const forgotPasswordVerifyOtpApi = async(data : {email : string , otp : string}) => {
    const res = await axiosInstance.post(import.meta.env.VITE_USER_SERVICE_BASE_URL + "/user/auth/forgot-password/verify-otp" , data)
    return res.data
}

export const resetPasswordApi = async(data : {password : string}) => {
    const res = await axiosInstance.post(import.meta.env.VITE_USER_SERVICE_BASE_URL + "/user/auth/forgot-password" , data)
    return res.data
}

export const logoutApi = async() => {
    const res = await axiosInstance.post(import.meta.env.VITE_USER_SERVICE_BASE_URL + "/user/auth/logout")
    return res.data
}

export const refreshTokenApi = async() => {
    const res = await axios.get("http://localhost:5000" + import.meta.env.VITE_USER_SERVICE_BASE_URL + "/user/refresh-token" , {withCredentials : true})
    return res.data
}

export const userDataApi = async() => {
    const res = await axiosInstance.get(import.meta.env.VITE_USER_SERVICE_BASE_URL + "/user/me")
    return res.data
}