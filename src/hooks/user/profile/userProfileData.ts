import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../utils/query.keys";
import { fetchUserProfileApi } from "../../../api/user/profile.api";

export const useProfileData = () => {
  return useQuery({
    queryKey: queryKeys.profile,
    queryFn: fetchUserProfileApi,
    retry: false,
  });
};