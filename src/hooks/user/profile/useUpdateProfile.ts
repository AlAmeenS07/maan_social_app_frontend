import { useMutation } from "@tanstack/react-query";
import { updateProfileApi } from "../../../api/user/profile.api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { commonErrorHandler } from "../../../utils/commonErrorHandler";
import type { EditProfileFormData } from "../../../types/user/user.profile";


export const useUpdateProfile = () => {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: ({id,data}: {id: string, data: EditProfileFormData}) => updateProfileApi(id, data),

        onSuccess: (res) => {
            if (res.success) {
                toast.success(res.message);
                navigate("/profile");
            }
        },

        onError: (error) => {
            commonErrorHandler(error)
        },
    });
};