import { UserModel } from "@/models/user";
import { ErrorResponse } from "@/services/api/responses.types";
import { ApiUserGetParams, ApiUserGetResponse, userGetApi } from "@/services/api/users.get.endpoint";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

const useUserQuery = (
    params: ApiUserGetParams,
    opts: Partial<UseQueryOptions<ApiUserGetResponse>> = {},
) => {
    return useQuery<ApiUserGetResponse>({
      queryKey: ['user', params.id],
      queryFn: () => userGetApi(params),
      ...opts,
    });
}

export type UseUserResponse = {
    user?: UserModel,
    error?: ErrorResponse
    refetch: () => void
    isFetched: boolean
}

export const useUser = (id: number): UseUserResponse => {
    const { data, refetch, isFetched } = useUserQuery({ id });

    return { user: data?.model, error: data?.error, refetch, isFetched };
};