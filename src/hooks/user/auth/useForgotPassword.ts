import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { forgotPasswordApi } from "../../../api/user/auth.api";

export const useForgotPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: forgotPasswordApi,

    onSuccess: (res, variables) => {
      if (res.success) {
        toast.success(res.message);
        localStorage.setItem("otp_expiry", (Date.now() + 60000).toString());
        navigate(`/verify-otp?email=${variables.email}&fp=true`);
      }
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};