// hooks/user/auth/useVerifyOtp.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { otpVerifyApi } from "../../../api/user/auth.api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/slices/user.slice";
import { queryKeys } from "../../../utils/query.keys";
import { commonErrorHandler } from "../../../utils/commonErrorHandler";

export const useVerifyOtp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: otpVerifyApi,

    onSuccess: (res) => {
      if (res.success) {
        dispatch(setUser(res.data));

        queryClient.setQueryData(queryKeys.user, res.data);

        toast.success(res.message);
        navigate("/");
      }
    },

    onError: (error) => {
      commonErrorHandler(error)
    },
  });
};