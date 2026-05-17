import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../utils/query.keys";
import { fetchLocationApi } from "../../../api/user/profile.api";


export const useLocationSearch = (search : string) => {
  return useQuery({
    queryKey: [queryKeys.location, search],
    queryFn: () => fetchLocationApi(search),
    retry: false,
  });
};