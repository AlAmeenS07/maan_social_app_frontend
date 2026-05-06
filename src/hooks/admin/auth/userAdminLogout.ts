// hooks/admin/auth/useAdminLogout.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { adminLogoutApi } from "../../../api/admin/admin.auth.api";
import { logout } from "../../../store/slices/user.slice";
import { queryKeys } from "../../../utils/query.keys";
import { commonErrorHandler } from "../../../utils/commonErrorHandler";

export const useAdminLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminLogoutApi,

    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message);

        dispatch(logout());

        queryClient.removeQueries({ queryKey: queryKeys.user });

        navigate("/admin/login");
      }
    },

    onError: (error) => {
      commonErrorHandler(error)
    },
  });
};