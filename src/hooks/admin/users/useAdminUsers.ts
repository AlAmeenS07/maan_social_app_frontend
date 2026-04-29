// hooks/admin/users/useAdminUsers.ts

import { useQuery } from "@tanstack/react-query";
import { adminUsersApi } from "../../../api/admin/admin.users.api";
import { queryKeys } from "../../../utils/query.keys";

export const useAdminUsers = (params: any) => {
  return useQuery({
    queryKey: queryKeys.adminUsers(params),
    queryFn: () => adminUsersApi(params)
  });
};