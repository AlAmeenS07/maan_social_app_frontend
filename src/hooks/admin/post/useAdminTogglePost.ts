import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminListUnlistPostApi } from "../../../api/admin/admin.posts.api";
import toast from "react-hot-toast";
import { queryKeys } from "../../../utils/query.keys";
import { commonErrorHandler } from "../../../utils/commonErrorHandler";


export const useAdminTogglePost = <T>(params: T) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminListUnlistPostApi,

    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message);

        queryClient.invalidateQueries({ queryKey: queryKeys.adminPosts(params) });
      }
    },

    onError: (error) => {
      commonErrorHandler(error)
    },
  });
};