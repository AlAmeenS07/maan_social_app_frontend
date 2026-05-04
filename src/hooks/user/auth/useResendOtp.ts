// hooks/user/auth/useResendOtp.ts

import { useMutation } from "@tanstack/react-query";
import { resendOtpApi } from "../../../api/user/auth.api";
import toast from "react-hot-toast";
import { commonErrorHandler } from "../../../utils/commonErrorHandler";

export const useResendOtp = () => {
  return useMutation({
    mutationFn: resendOtpApi,

    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message);

        localStorage.setItem("otp_expiry", (Date.now() + 60000).toString());
      }
    },

    onError: (error) => {
      commonErrorHandler(error)
    },
  });
};