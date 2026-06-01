import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createPostApi } from "../../../api/user/post.api";
import toast from "react-hot-toast";
import { commonErrorHandler } from "../../../utils/commonErrorHandler";


export const useCreatePost = () => {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: createPostApi,

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