import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { logoutApi } from "../../../api/user/auth.api";
import { logout } from "../../../store/slices/user.slice";
import { queryKeys } from "../../../utils/query.keys";

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutApi,

    onSuccess: (res) => {
      if (res.success) {
        dispatch(logout());
        queryClient.removeQueries({ queryKey: queryKeys.user });
        toast.success(res.message);
        navigate("/login");
      }
    },
  });
};