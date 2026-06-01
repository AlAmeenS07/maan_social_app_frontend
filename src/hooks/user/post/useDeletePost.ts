import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deletePostApi } from "../../../api/user/post.api";
import toast from "react-hot-toast";
import { commonErrorHandler } from "../../../utils/commonErrorHandler";


export const useDeletePost = () => {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: deletePostApi,

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