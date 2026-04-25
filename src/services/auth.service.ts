import toast from "react-hot-toast";
import { otpVerifyApi, registerApi, resendOtpApi } from "../api/auth.api";
import type { RegisterFormData } from "../pages/Register";
import { isAxiosError } from "axios";
import type { NavigateFunction } from "react-router-dom";


export const registerService = async (data: RegisterFormData, navigate: NavigateFunction) => {
    try {
        const res: any = await registerApi(data)

        if (res.success) {
            toast.success(res.message)
            navigate(`/verify-otp?email=${data.email}`)
        }

    } catch (error: unknown) {
        if (isAxiosError(error)) {
            toast.error(error.response?.data.message)
        }
        else if (error instanceof Error) {
            toast.error(error?.message)
        }
        else {
            toast.error("Something error !")
        }
    }
}


export const verifyOtpService = async (data: { email: string, otp: string }, navigate: NavigateFunction) => {
    try {

        const res : any = await otpVerifyApi(data)

        if(res.success){
            toast.success(res.message)
            navigate("/login")
        }

    } catch (error) {
        if (isAxiosError(error)) {
            toast.error(error.response?.data.message)
        }
        else if (error instanceof Error) {
            toast.error(error?.message)
        }
        else {
            toast.error("Something error !")
        }
    }
}


export const resendOtpService = async(data : string) =>{
    try {

        const res = await resendOtpApi(data)

        if(res.success){
            toast.success(res.message)
        }
        
    } catch (error) {
        if (isAxiosError(error)) {
            toast.error(error.response?.data.message)
        }
        else if (error instanceof Error) {
            toast.error(error?.message)
        }
        else {
            toast.error("Something error !")
        }        
    }
}