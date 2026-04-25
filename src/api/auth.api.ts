import type { LoginFormData } from "../pages/Login";
import type { RegisterFormData } from "../pages/Register";
import axiosInstance from "./axios";


console.log("URL" , import.meta.env)

export const registerApi = async(data : RegisterFormData) => {
    const res = await axiosInstance.post(import.meta.env.VITE_USER_SERVICE_BASE_URL + "/user/register" , {
        name : data.fullname , email : data.email , dob : data.dob , gender : data.gender , password : data.password
    })
    return res.data
}

export const loginApi = async(data : LoginFormData) => {
    const res = await axiosInstance.post(import.meta.env.VITE_USER_SERVICE_BASE_URL + "/user/login" , data)
    return res.data
}

export const resendOtpApi = async(data : string) => {
    const res = await axiosInstance.post(import.meta.env.VITE_USER_SERVICE_BASE_URL + "/user/resend-otp" , {email : data})
    return res.data
}

export const otpVerifyApi = async(data : {email : string , otp : string}) => {
    const res = await axiosInstance.post(import.meta.env.VITE_USER_SERVICE_BASE_URL + "/user/verify-otp" , data)
    return res.data
}

export const forgotPasswordApi = async(data : string) => {
    const res = await axiosInstance.post(import.meta.env.VITE_USER_SERVICE_BASE_URL + "/user/forgot-password/otp" , data)
    return res.data
}

export const forgotPasswordOtpApi = async(data : {email : string , otp : string}) => {
    const res = await axiosInstance.post(import.meta.env.VITE_USER_SERVICE_BASE_URL + "/user/forgot-password/verify-otp" , data)
    return res.data
}

export const resendForgotPasswordOtpApi = async(data : {email : string , otp : string}) => {
    const res = await axiosInstance.post(import.meta.env.VITE_USER_SERVICE_BASE_URL + "/user/forgot-password/resend-otp" , data)
    return res.data
}

export const resetPasswordApi = async(data : string) => {
    const res = await axiosInstance.post(import.meta.env.VITE_USER_SERVICE_BASE_URL + "/user/forgot-password" , data)
    return res.data
}