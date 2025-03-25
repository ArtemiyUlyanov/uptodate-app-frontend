import { UserModel } from "@/models/user";
import { ErrorResponse } from "@/services/api/responses.types";
import { ApiUserGetParams, ApiUserGetResponse, ApiUsersGetParams, ApiUsersGetResponse, userGetApi, usersGetApi } from "@/services/api/users.get.endpoint";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

const useUsersQuery = (
    params: ApiUsersGetParams,
    opts: Partial<UseQueryOptions<ApiUsersGetResponse>> = {},
) => {
    return useQuery<ApiUsersGetResponse>({
      queryKey: ['users', params.ids],
      queryFn: () => usersGetApi(params),
      ...opts,
    });
}

export type UseUsersParams = {
    ids: number[]
}

export type UseUsersResponse = {
    users?: UserModel[],
    error?: ErrorResponse
    refetch: () => void
    isFetched: boolean
}

export const useUsers = ({ ids }: UseUsersParams): UseUsersResponse => {
    const { data, refetch, isFetched } = useUsersQuery({ ids });

    return { users: data?.models, error: data?.error, refetch, isFetched };
};