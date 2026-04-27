import type { NavigateFunction } from "react-router-dom";
import type { LoginFormData } from "../../pages/admin/AdminLogin";
import type { AppDispatch } from "../../store/store";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { adminLoginApi, adminLogoutApi } from "../../api/admin/admin.auth.api";
import { loadingEnd, loadingStart, logout, setUser } from "../../store/slices/user.slice";


export const adminLoginService = async (data: LoginFormData, navigate: NavigateFunction, dispatch: AppDispatch) => {
    try {

        dispatch(loadingStart())

        const res = await adminLoginApi(data)

        console.log("admin-login-service" , res)

        if (res.success) {
            dispatch(setUser(res.data))
            toast.success(res.message)
            navigate("/admin/dashboard")
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
    finally {
        dispatch(loadingEnd())
    }
}


export const adminLogoutService = async (navigate : NavigateFunction , dispatch : AppDispatch) => {
    try {

        const res = await adminLogoutApi()

        if(res.success){
            toast.success(res.message)
            dispatch(logout())
            navigate("/admin/login")
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