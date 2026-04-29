// hooks/admin/auth/useAdminLogin.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { adminLoginApi } from "../../../api/admin/admin.auth.api";
import { setUser } from "../../../store/slices/user.slice";
import { queryKeys } from "../../../utils/query.keys";

export const useAdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminLoginApi,

    onSuccess: (res) => {
      if (res.success) {
        dispatch(setUser(res.data));

        queryClient.setQueryData(queryKeys.user, res.data);

        toast.success(res.message);
        navigate("/admin/dashboard");
      }
    },

    onError: (error) => {
      let message = "Admin login failed";

      if (typeof error === "object" && error !== null && "response" in error) {
        const err = error as {
          response?: { data?: { message?: string } };
        };

        message = err.response?.data?.message || message;
      }

      toast.error(message);
    }
  });
};