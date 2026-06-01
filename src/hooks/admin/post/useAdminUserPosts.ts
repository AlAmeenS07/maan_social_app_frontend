import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../utils/query.keys";
import { adminUserPostsDataApi } from "../../../api/admin/admin.posts.api";


export const useAdminUserPosts = (id : string) => {
  return useQuery({
    queryKey: queryKeys.adminUserPosts,
    queryFn: () => adminUserPostsDataApi(id)
  });
};