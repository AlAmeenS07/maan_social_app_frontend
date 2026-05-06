// hooks/user/auth/useRegister.ts

import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../../../api/user/auth.api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { commonErrorHandler } from "../../../utils/commonErrorHandler";

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerApi,

    onSuccess: (res, variables) => {
      if (res.success) {

        localStorage.setItem("otp_expiry", (Date.now() + 60000).toString());

        toast.success(res.message);

        navigate(`/verify-otp?email=${variables.email}`);
      }
    },

    onError: (error) => {
      commonErrorHandler(error)
    },
  });
};