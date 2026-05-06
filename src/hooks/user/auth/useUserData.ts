import { useQuery } from "@tanstack/react-query";
import { userDataApi } from "../../../api/user/auth.api";
import { queryKeys } from "../../../utils/query.keys";

export const useUserData = () => {
  return useQuery({
    queryKey: queryKeys.user,
    queryFn: userDataApi,
    retry: false,
  });
};