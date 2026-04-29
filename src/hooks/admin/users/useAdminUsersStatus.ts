// hooks/admin/users/useToggleUserStatus.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { adminUserStatusApi } from "../../../api/admin/admin.users.api";
import { queryKeys } from "../../../utils/query.keys";

export const useAdminUsersStatus = (params: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminUserStatusApi,

    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message);

        queryClient.invalidateQueries({ queryKey: queryKeys.adminUsers(params) });
      }
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update user");
    },
  });
};