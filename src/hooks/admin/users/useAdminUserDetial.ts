import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../utils/query.keys";
import { fetchUserApi } from "../../../api/admin/admin.users.api";

export const useAdminUserDetail = (id: string) => {

    return useQuery({
        queryKey: [...queryKeys.adminUser, id],
        queryFn: () => fetchUserApi(id),
        retry: false,
        enabled: !!id,
    });
};