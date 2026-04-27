import type { SetStateAction } from "react";
import type React from "react";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { adminUsersApi } from "../../api/admin/admin.users.api";



export const adminUsersService = async (
    params: any,
    setUsers: React.Dispatch<SetStateAction<any[]>>,
    setTotalPages: React.Dispatch<SetStateAction<number>>
) => {
    try {

        const res: any = await adminUsersApi(params)

        if (res.success) {
            setUsers(res.data?.users)
            setTotalPages(res.data.totalPages)
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