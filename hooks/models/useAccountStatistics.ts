import { UserModel } from "@/models/user";
import { UserStatisticsModel } from "@/models/user_statistics";
import { accountStatisticsApi, ApiAccountStatisticsParams, ApiAccountStatisticsResponse } from "@/services/api/account.statistics.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";
import { RootState } from "@/store/store";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const useAccountStatisticsQuery = (
    params: ApiAccountStatisticsParams,
    opts: Partial<UseQueryOptions<ApiAccountStatisticsResponse>> = {},
) => {
    return useQuery<ApiAccountStatisticsResponse>({
      queryKey: ['account-statistics', params.isAuthenticated, params.access_token],
      queryFn: () => accountStatisticsApi(params),
      ...opts,
    });
}

export type UseAccountResponse = {
    statistics?: UserStatisticsModel
    error?: ErrorResponse
    refetch: () => void
    isFetched: boolean
}

export const useAccountStatistics = (): UseAccountResponse => {
    const { isAuthenticated, access_token } = useSelector((state: RootState) => state.auth);
    const { data, refetch, isFetched } = useAccountStatisticsQuery(
        { isAuthenticated, access_token }
    );

    return { statistics: data?.model, error: data?.error, refetch, isFetched };
};