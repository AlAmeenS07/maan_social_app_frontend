import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updatePostApi } from "../../../api/user/post.api";
import type { PostUploadData } from "../../../types/user/user.post";
import toast from "react-hot-toast";
import { commonErrorHandler } from "../../../utils/commonErrorHandler";

export const useUpdatePost = () => {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: ({id, data} : {id : string, data : PostUploadData}) => updatePostApi(id, data),

        onSuccess: (res) => {
            if (res.success) {
                toast.success(res.message);
                navigate("/");
            }
        },

        onError: (error) => {
            commonErrorHandler(error)
        },
    });
};