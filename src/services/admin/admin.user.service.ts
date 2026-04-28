import type { SetStateAction } from "react";
import type React from "react";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { adminUsersApi, adminUserStatusApi } from "../../api/admin/admin.users.api";



export const adminUsersService = async (
    params: any,
    setUsers: React.Dispatch<SetStateAction<any[]>>,
    setTotalPages: React.Dispatch<SetStateAction<number>>
) => {
    try {

        console.log("params-forntend-service", params)

        const res: any = await adminUsersApi(params)

        if (res.success) {
            setUsers(res.data.users)
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


export const adminUserStatusService = async (id: string, setUsers: React.Dispatch<SetStateAction<any>>) => {
    try {

        const res: any = await adminUserStatusApi(id)

        if (res.success) {
            toast.success(res.message)
            setUsers((prevUsers: any[]) =>
                prevUsers.map((user) =>
                    user.id === id
                        ? { ...user, is_blocked: !user.is_blocked }
                        : user
                )
            );
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