import { useQuery } from "@tanstack/react-query";
import { viewImageUrlApi } from "../../../api/user/media.api";

export const useImageView = (key : string) => {
  return useQuery({
    queryKey: [key],
    queryFn: () => viewImageUrlApi(key),
    enabled: !!key,
    retry: false,
  });
};