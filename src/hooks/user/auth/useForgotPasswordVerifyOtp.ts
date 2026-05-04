import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { forgotPasswordVerifyOtpApi } from "../../../api/user/auth.api";
import { commonErrorHandler } from "../../../utils/commonErrorHandler";

export const useForgotPasswordVerifyOtp = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: forgotPasswordVerifyOtpApi,

    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message);
        navigate("/reset-password");
      }
    },

    onError: (error) => {
      commonErrorHandler(error)
    },
  });
};