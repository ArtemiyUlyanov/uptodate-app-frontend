import { ArticleModel } from "@/models/article"
import { ApiArticleGetParams, ApiArticleGetResponse, ApiArticlesGetParams, ApiArticlesGetResponse } from "@/services/api/articles.get.endpoint"
import { QueryObserverResult, RefetchOptions, UseMutateFunction, useQuery, UseQueryOptions } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useArticleLikeMutation } from "./mutations/useArticleLikeMutation"
import { ApiArticleLikeParams, ApiArticleLikeResponse } from "@/services/api/articles.like.endpoint"
import { ErrorResponse } from "@/services/api/responses.types"
import { useRouter } from "next/navigation"
import { useAccount } from "./useAccount"
import { useCommentsDeleteMutation } from "./mutations/useCommentsDeleteMutation"
import { useArticlesDeleteMutation } from "./mutations/useArticlesDeleteMutation"
import { useArticlesLikeMutation } from "./mutations/useArticlesLikeMutation"
import { ApiArticleDeleteParams, ApiArticleDeleteResponse } from "@/services/api/articles.delete.endpoint"
import { TimezoneModel } from "@/models/timezone"
import { ApiTimezonesGetParams, ApiTimezonesGetResponse, timezonesGetApi } from "@/services/api/timezones.get.endpoint"

export type UseTimezonesParams = {
    query?: string
}

export type UseTimezonesResponse = {
    timezones?: TimezoneModel[]
}

const useTimezonesQuery = (
    params: ApiTimezonesGetParams,
    opts: Partial<UseQueryOptions<ApiTimezonesGetResponse>> = {},
) => {
    return useQuery<ApiTimezonesGetResponse>({
        queryKey: ['timezones', params.query],
        queryFn: () => timezonesGetApi(params),
        ...opts,
    });
}

export const useTimezones = ({
    query
}: UseTimezonesParams): UseTimezonesResponse => {
    const { user } = useAccount();
    const { data, refetch } = useTimezonesQuery({ query });

    useEffect(() => {
        refetch();
    }, [user]);

    return { timezones: data?.timezones };
}