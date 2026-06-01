import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../utils/query.keys";
import { adminPostsApi } from "../../../api/admin/admin.posts.api";


export const useAdminPosts = <T>(params: T) => {
  return useQuery({
    queryKey: queryKeys.adminPosts(params),
    queryFn: () => adminPostsApi(params)
  });
};