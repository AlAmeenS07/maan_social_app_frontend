import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { resetPasswordApi } from "../../../api/user/auth.api";

export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: resetPasswordApi,

    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message);
        navigate("/login");
      }
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};