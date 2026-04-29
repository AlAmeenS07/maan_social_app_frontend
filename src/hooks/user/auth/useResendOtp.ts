// hooks/user/auth/useResendOtp.ts

import { useMutation } from "@tanstack/react-query";
import { resendOtpApi } from "../../../api/user/auth.api";
import toast from "react-hot-toast";

export const useResendOtp = () => {
  return useMutation({
    mutationFn: resendOtpApi,

    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message);

        localStorage.setItem("otp_expiry", (Date.now() + 60000).toString());
      }
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to resend OTP");
    },
  });
};