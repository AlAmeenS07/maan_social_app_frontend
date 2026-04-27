import toast from "react-hot-toast";
import { forgotPasswordApi, forgotPasswordVerifyOtpApi, loginApi, logoutApi, otpVerifyApi, registerApi, resendOtpApi, resetPasswordApi, userDataApi } from "../../api/user/auth.api";
import type { RegisterFormData } from "../../pages/user/Register";
import { isAxiosError } from "axios";
import type { NavigateFunction } from "react-router-dom";
import type { AppDispatch } from "../../store/store";
import { logout, setUser } from "../../store/slices/user.slice";
import type { LoginFormData } from "../../pages/user/Login";


export const registerService = async (data: RegisterFormData, navigate: NavigateFunction) => {
    try {
        const res: any = await registerApi(data)

        if (res.success) {
            toast.success(res.message)
            localStorage.setItem("otp_expiry", (Date.now() + 60000).toString());
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


export const verifyOtpService = async (data: { email: string, otp: string }, navigate: NavigateFunction, dispatch: AppDispatch) => {
    try {

        const res: any = await otpVerifyApi(data)

        if (res.success) {
            dispatch(setUser(res.data))
            toast.success(res.message)
            navigate("/")
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


export const resendOtpService = async (data: string) => {
    try {

        const res = await resendOtpApi(data)

        if (res.success) {
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


export const loginUserService = async (data: LoginFormData, navigate: NavigateFunction, dispatch: AppDispatch) => {
    try {

        const res = await loginApi(data)

        if (res.success) {
            dispatch(setUser(res.data))
            toast.success(res.message)
            navigate("/")
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


export const logoutUserService = async (navigate: NavigateFunction, dispatch: AppDispatch) => {
    try {

        const res = await logoutApi()

        if (res.success) {
            dispatch(logout())
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


export const forgotPasswordService = async (data: { email: string }, navigate: NavigateFunction) => {
    try {

        const res = await forgotPasswordApi(data)

        if (res.success) {
            toast.success(res.message)
            localStorage.setItem("otp_expiry", (Date.now() + 60000).toString());
            navigate(`/verify-otp?email=${data.email}&fp=true`)
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


export const forgotPasswordVerifyOtpService = async (data: { email: string, otp: string }, navigate: NavigateFunction, dispatch: AppDispatch) => {
    try {

        const res: any = await forgotPasswordVerifyOtpApi(data)

        if (res.success) {
            toast.success(res.message)
            navigate("/reset-password")
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


export const resetPasswordService = async (data: { password: string }, navigate: NavigateFunction) => {
    try {

        const res = await resetPasswordApi(data)

        if (res.success) {
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


export const fetchUserDataService = async () => {
    try {

        const res = await userDataApi()

        return res.data
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