import { useMutation } from "@tanstack/react-query";
import { checkUserNameApi } from "../../../api/user/profile.api";
import { commonErrorHandler } from "../../../utils/commonErrorHandler";


export const useCheckUserName = () => {
  return useMutation({
    mutationFn: checkUserNameApi,

    onError: (error) => {
      commonErrorHandler(error)
    },
  });
};