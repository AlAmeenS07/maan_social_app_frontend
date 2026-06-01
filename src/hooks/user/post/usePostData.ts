import { useQuery } from "@tanstack/react-query";
import { fetchUserPostsApi } from "../../../api/user/post.api";
import { queryKeys } from "../../../utils/query.keys";


export const usePostData = () => {
  return useQuery({
    queryKey: queryKeys.userPosts,
    queryFn: fetchUserPostsApi,
    retry: false,
  });
};