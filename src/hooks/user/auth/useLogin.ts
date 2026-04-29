// hooks/user/auth/useLogin.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginApi } from "../../../api/user/auth.api";
import { setUser } from "../../../store/slices/user.slice";
import { queryKeys } from "../../../utils/query.keys";

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginApi,

    onSuccess: (res) => {
      if (res.success) {
        dispatch(setUser(res.data));

        queryClient.setQueryData(queryKeys.user, res.data);

        toast.success(res.message);
        navigate("/");
      }
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Login failed");
    },
  });
};